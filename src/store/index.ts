import { create } from 'zustand';
import mapboxgl from 'mapbox-gl';
import { DEFAULT_PROJECTION } from '@/ui/constants';

interface GeoJSONStore {
  projection: mapboxgl.ProjectionSpecification['name'];
  setProjection: (projection: mapboxgl.ProjectionSpecification['name']) => void;
}

const useGeoJSONStore = create<GeoJSONStore>((set) => ({
  projection: DEFAULT_PROJECTION,
  setProjection: (projection) => set({ projection })
}));

export default useGeoJSONStore;
