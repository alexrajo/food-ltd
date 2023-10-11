import cross from 'src/assets/cross.svg';
import useFilter from 'src/hooks/useFilter';

type FilterDisplayProps = {
  name: string;
  type: 'include' | 'exclude';
};

export default function FilterDisplay(props: FilterDisplayProps) {
  const { name, type } = props;
  const { removeExcludedFilter, removeIncludedFilter } = useFilter();

  const onClick = () => {
    if (type === 'include') {
      removeIncludedFilter(name);
    } else {
      removeExcludedFilter(name);
    }
  };

  return (
    <div className='flex items-center gap-2 p-2 border border-black rounded-lg'>
      <div className='flex gap-2'>
        <div className=' first-letter:uppercase font-bold'>{type}:</div>
        <div>{name}</div>
      </div>
      <button type='button' onClick={onClick}>
        <img
          alt='remove filter cross'
          className='w-4 h-4 cursor-pointer'
          src={cross}
        />
      </button>
    </div>
  );
}
