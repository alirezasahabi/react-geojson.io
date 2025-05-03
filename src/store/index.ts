import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProjectionSpecification } from 'mapbox-gl';
import { DEFAULT_PROJECTION, DEFAULT_STYLE } from '@/constants';

interface GeoJSONStore {
  projection: ProjectionSpecification['name'];
  setProjection: (projection: mapboxgl.ProjectionSpecification['name']) => void;
  activeStyle: string;
  setActiveStyle: (style: string) => void;
}

const useGeoJSONStore = create<GeoJSONStore>()(
  // Persisting the Zustand store using local storage
  persist(
    (set) => ({
      projection: DEFAULT_PROJECTION,
      setProjection: (projection) => set({ projection }),
      activeStyle: DEFAULT_STYLE,
      setActiveStyle: (activeStyle) => set({ activeStyle })
    }),
    {
      name: 'geojson-store'
    }
  )
);

export default useGeoJSONStore;
