import MapboxDraw from '@mapbox/mapbox-gl-draw';

declare module '@mapbox/mapbox-gl-draw' {
  namespace MapboxDraw {
    /**
     * Extend DrawMode to include custom lifecycle methods for custom modes.
     * These methods will be called with `this` bound to the Draw instance.
     */
    interface DrawMode {
      /**
       * Called when the mode is initialized. Return any custom state.
       */
      onSetup?(options?: any): any;

      /**
       * Called on map click or tap.
       */
      onClick?(state: any, e: any): void;
      onTap?(state: any, e: any): void;

      /**
       * Called when the mouse moves.
       */
      onMouseMove?(state: any, e: any): void;

      /**
       * Called on key up events.
       */
      onKeyUp?(state: any, e: KeyboardEvent): void;

      /**
       * Called when the mode is stopped (e.g. mode change).
       */
      onStop?(state: any): void;

      /**
       * Called when the trash button is clicked.
       */
      onTrash?(state: any): void;

      /**
       * Controls feature display per frame.
       */
      toDisplayFeatures?(
        state: any,
        feature: any,
        display: (f: any) => void
      ): void;
    }
  }
}
