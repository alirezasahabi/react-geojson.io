import { useEffect } from 'react';
import useGeoJSONStore from './store';
import { ProjectionSpecification } from 'mapbox-gl';
import Map from './ui/map';

const App = () => {
  const setProjection = useGeoJSONStore((s) => s.setProjection);

  useEffect(() => {
    const projection = localStorage.getItem('projection');

    if (projection)
      setProjection(projection as ProjectionSpecification['name']);
  }, []);

  return <Map />;
};

export default App;
