import styles from './map/styles';

interface Props {
  style: string;
  onStyleSwitch: (newStyle: string) => void;
}
const StyleSwitch = ({ style, onStyleSwitch }: Props) => {
  return (
    <div className="absolute left-0 bottom-0 mb-9 text-xs z-10">
      {styles.map((s) => {
        const isActive = style === s.title;

        return (
          <button
            onClick={() => onStyleSwitch(s.title)}
            className={`${
              isActive ? 'text-white bg-[#34495e]' : 'bg-white'
            } px-[5px] py-[2px] cursor-pointer`}
            key={s.title}
          >
            {s.title}
          </button>
        );
      })}
    </div>
  );
};

export default StyleSwitch;
