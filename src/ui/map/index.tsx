// hooks
import { useEffect, useRef } from 'react';
import useGeoJSONStore from '@/store';
//
import mapboxgl from 'mapbox-gl';
// components
import ProjectionSwitch from '../projection-switch';
import StyleSwitch from '../style-switch';
//
import styles from './styles';

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
      const style = styles.find((d) => d.title === newStyle)?.style as
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

    const style = styles.find((d) => d.title === activeStyle)?.style as
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
