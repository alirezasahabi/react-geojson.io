import { useEffect } from 'react';
import useGeoJSONStore from './store';
import Map from './ui/map';
import { ProjectionSpecification } from 'mapbox-gl';

const App = () => {
  const setProjection = useGeoJSONStore((s) => s.setProjection);
  const setActiveStyle = useGeoJSONStore((s) => s.setActiveStyle);

  useEffect(() => {
    const projection = localStorage.getItem('projection');
    if (projection)
      setProjection(projection as ProjectionSpecification['name']);

    const activeStyle = localStorage.getItem('style');
    if (activeStyle) setActiveStyle(activeStyle);
  }, []);

  return <Map />;
};

export default App;
