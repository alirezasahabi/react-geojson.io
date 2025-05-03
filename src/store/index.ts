import { create } from 'zustand';
import { ProjectionSpecification } from 'mapbox-gl';
import { DEFAULT_PROJECTION } from '@/ui/constants';

interface GeoJSONStore {
  projection: ProjectionSpecification['name'];
  setProjection: (projection: mapboxgl.ProjectionSpecification['name']) => void;
}

const useGeoJSONStore = create<GeoJSONStore>((set) => ({
  projection: DEFAULT_PROJECTION,
  setProjection: (projection) => {
    localStorage.setItem('projection', projection);
    set({ projection });
  }
}));

export default useGeoJSONStore;
