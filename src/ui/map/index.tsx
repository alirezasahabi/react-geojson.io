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
  const activeStyle = useGeoJSONStore((s) => s.activeStyle);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);

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

  // Switch projection
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setProjection(projection);
  }, [projection]);

  // Switch style
  useEffect(() => {
    if (!mapRef.current) return;

    const style = styles.find((d) => d.title === activeStyle)?.style as
      | string
      | mapboxgl.StyleSpecification;

    mapRef.current.setStyle(style);
  }, [activeStyle]);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />
      <ProjectionSwitch />
      <StyleSwitch />
    </>
  );
};

export default Map;
