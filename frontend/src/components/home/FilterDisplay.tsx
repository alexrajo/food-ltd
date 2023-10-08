import cross from 'src/assets/cross.svg';
import useFilter from 'src/hooks/useFilter';

type FilterDisplayProps = {
  name: string
  type: string
}

export default function FilterDisplay(props: FilterDisplayProps) {
  const { name, type } = props
  const { onClickRemoveFilter } = useFilter();

  const onClick = () => {
    onClickRemoveFilter(name);
  };

  return (
    <div className='flex items-center gap-2 p-2 border border-black rounded-lg'>
      <div className='flex gap-2'>
        <div className=' first-letter:uppercase font-bold'>{type}:</div>
        <div>{name}</div>
      </div>
      <img onClick={onClick} alt='cross' className='w-4 h-4' src={cross} />
    </div>
  );
}
