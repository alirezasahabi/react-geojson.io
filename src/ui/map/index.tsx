// hooks
import { useEffect, useRef } from 'react';
import useGeoJSONStore from '@/store';
//
import mapboxgl from 'mapbox-gl';
// components
import ProjectionSwitch from './projection-switch';
//
import styles from './styles';
import { DEFAULT_STYLE } from '../constants';

const Map = () => {
  const projection = useGeoJSONStore((s) => s.projection);

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

    const activeStyle = localStorage.getItem('style') || DEFAULT_STYLE;

    const style = styles.find((d) => d.title === activeStyle)?.style as
      | string
      | mapboxgl.StyleSpecification
      | undefined;

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

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setProjection(projection);
  }, [projection]);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />
      <ProjectionSwitch />
    </>
  );
};

export default Map;
