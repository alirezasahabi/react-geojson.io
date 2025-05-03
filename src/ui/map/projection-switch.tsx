import useGeoJSONStore from '@/store';
import mapboxgl from 'mapbox-gl';

const projections: {
  label: string;
  value: mapboxgl.ProjectionSpecification['name'];
}[] = [
  {
    label: 'Globe',
    value: 'globe'
  },
  {
    label: 'Mercator',
    value: 'mercator'
  }
];

const ProjectionSwitch = () => {
  const projection = useGeoJSONStore((s) => s.projection);
  const setProjection = useGeoJSONStore((s) => s.setProjection);

  return (
    <div className="projection-switch absolute left-0 bottom-0 mb-16 text-xs transition-all duration-200 z-10">
      {projections.map((p) => {
        const isActive = projection === p.value;

        return (
          <button
            onClick={() => setProjection(p.value)}
            className={`${
              isActive ? 'text-white bg-[#34495e]' : 'bg-white'
            } px-[5px] py-[2px] cursor-pointer`}
            key={p.value}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectionSwitch;
