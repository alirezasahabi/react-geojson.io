import { ProjectionSpecification } from 'mapbox-gl';

const projections: {
  label: string;
  value: ProjectionSpecification['name'];
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

interface Props {
  projection: ProjectionSpecification['name'];
  onProjectionSwitch: (newProjection: ProjectionSpecification['name']) => void;
}
const ProjectionSwitch = ({ projection, onProjectionSwitch }: Props) => {
  return (
    <div className="absolute left-0 bottom-0 mb-16 text-xs transition-all duration-200 z-10">
      {projections.map((p) => {
        const isActive = projection === p.value;

        return (
          <button
            onClick={() => onProjectionSwitch(p.value)}
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
