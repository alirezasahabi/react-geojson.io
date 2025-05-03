import { create } from 'zustand';
import { ProjectionSpecification } from 'mapbox-gl';
import { DEFAULT_PROJECTION, DEFAULT_STYLE } from '@/constants';

interface GeoJSONStore {
  projection: ProjectionSpecification['name'];
  setProjection: (projection: mapboxgl.ProjectionSpecification['name']) => void;
  activeStyle: string;
  setActiveStyle: (style: string) => void;
}

const useGeoJSONStore = create<GeoJSONStore>((set) => ({
  projection: DEFAULT_PROJECTION,
  setProjection: (projection) => {
    localStorage.setItem('projection', projection);
    set({ projection });
  },
  activeStyle: DEFAULT_STYLE,
  setActiveStyle: (activeStyle) => set({ activeStyle })
}));

export default useGeoJSONStore;
