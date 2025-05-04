// hooks
import { useEffect, useRef } from 'react';
import useGeoJSONStore from '@/store';
//
import mapboxgl from 'mapbox-gl';
// draw
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import ExtendedDrawBar from '../draw/extended-draw-bar';
import DrawLineString from '../draw/linestring';
//
import ProjectionSwitch from '../projection-switch';
import StyleSwitch from '../style-switch';
// styles
import mapStyles from './styles';
import drawStyles from '../draw/styles';

const Map = () => {
  const projection = useGeoJSONStore((s) => s.projection);
  const setProjection = useGeoJSONStore((s) => s.setProjection);
  const activeStyle = useGeoJSONStore((s) => s.activeStyle);
  const setActiveStyle = useGeoJSONStore((s) => s.setActiveStyle);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);

  const handleProjectionSwitch = (
    newProjection: mapboxgl.ProjectionSpecification['name']
  ) => {
    const map = mapRef.current;
    if (map) {
      map.setProjection(newProjection);
      setProjection(newProjection);
    }
  };

  const handleStyleSwitch = (newStyle: string) => {
    const map = mapRef.current;
    if (map) {
      const style = mapStyles.find((d) => d.title === newStyle)?.style as
        | string
        | mapboxgl.StyleSpecification;

      map.setStyle(style);
      setActiveStyle(newStyle);
    }
  };

  // Map initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1Ijoic3ZjLW9rdGEtbWFwYm94LXN0YWZmLWFjY2VzcyIsImEiOiJjbG5sMnExa3kxNTJtMmtsODJld24yNGJlIn0.RQ4CHchAYPJQZSiUJ0O3VQ';

    mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      null,
      true
    );

    const style = mapStyles.find((d) => d.title === activeStyle)?.style as
      | string
      | mapboxgl.StyleSpecification;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style,
      center: [20, 0],
      zoom: 2,
      projection,
      hash: 'map'
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      modes: { ...MapboxDraw.modes, draw_line_string: DrawLineString },
      controls: {},
      styles: drawStyles
    });

    const drawControl = new ExtendedDrawBar({
      draw,
      buttons: [
        {
          on: 'click',
          action: () => {
            // drawing = true;
            // context.Draw.changeMode('draw_point');
            draw.changeMode('draw_point');
          },
          classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_point'],
          title: 'Draw Point (m)'
        },
        {
          on: 'click',
          action: () => {
            // drawing = true;
            // context.Draw.changeMode('draw_line_string');
            draw.changeMode('draw_line_string');
          },
          classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_line'],
          title: 'Draw LineString (l)'
        },
        {
          on: 'click',
          action: () => {
            // drawing = true;
            // context.Draw.changeMode('draw_polygon');
            draw.changeMode('draw_polygon');
          },
          classes: ['mapbox-gl-draw_ctrl-draw-btn', 'mapbox-gl-draw_polygon'],
          title: 'Draw Polygon (p)'
        }
      ]
    });

    map.addControl(drawControl);

    mapRef.current = map;

    return () => map.remove();
  }, []);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />
      <ProjectionSwitch
        projection={projection}
        onProjectionSwitch={handleProjectionSwitch}
      />
      <StyleSwitch style={activeStyle} onStyleSwitch={handleStyleSwitch} />
    </>
  );
};

export default Map;
