// from https://jsfiddle.net/fxi/xf51zet4/

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { IControl, Map } from 'mapbox-gl';

// Define the shape of each button in the extend draw bar
interface DrawButton {
  // DOM event name e.g. 'click'
  on: keyof HTMLElementEventMap;
  // callback when event fires
  action: (evt: Event) => void;
  // additional CSS classes to apply
  classes?: string[];
  // title attribute for accessibility
  title: string;
  // internal reference to the created button element
  elButton?: HTMLButtonElement;
}

interface ExtendDrawBarOptions {
  // Instance of MapboxDraw control
  draw: MapboxDraw;
  // Array of buttons to add
  buttons?: DrawButton[];
}

/**
 * ExtendDrawBar wraps a MapboxDraw control and allows adding custom buttons
 */
class ExtendedDrawBar implements IControl {
  private draw!: MapboxDraw;
  private buttons: DrawButton[] = [];
  private onAddOrig!: (map: mapboxgl.Map) => HTMLElement;
  private onRemoveOrig!: (map: mapboxgl.Map) => void;
  private map?: Map;
  private elContainer?: HTMLElement;

  constructor(opt: ExtendDrawBarOptions) {
    const ctrl = this;
    ctrl.draw = opt.draw;
    ctrl.buttons = opt.buttons || [];
    ctrl.onAddOrig = opt.draw.onAdd;
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }

  onAdd(map: Map) {
    const ctrl = this;
    ctrl.map = map;
    ctrl.elContainer = ctrl.onAddOrig(map);
    ctrl.buttons.forEach((b) => {
      ctrl.addButton(b);
    });
    return ctrl.elContainer;
  }

  onRemove(map: Map) {
    const ctrl = this;
    ctrl.buttons.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }

  addButton(opt: DrawButton) {
    const ctrl = this;
    const elButton = document.createElement('button');
    elButton.className = 'mapbox-gl-draw_ctrl-draw-btn';
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elButton.classList.add(c);
      });
    }
    elButton.addEventListener(opt.on, opt.action);
    elButton.title = opt.title;
    ctrl.elContainer?.appendChild(elButton);
    opt.elButton = elButton;
  }

  removeButton(opt: DrawButton) {
    const elButton = opt.elButton!;

    elButton.removeEventListener(opt.on, opt.action);
    elButton.remove();
  }
}

export default ExtendedDrawBar;
