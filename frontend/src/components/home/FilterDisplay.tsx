import { useFilter } from 'hooks';
import cross from 'src/assets/cross.svg';

export default function FilterDisplay({ name }: { name: string }) {
  const { onClickRemoveFilter } = useFilter();

  const onClick = () => {
    onClickRemoveFilter(name);
  };

  return (
    <div className='flex items-center gap-2 p-2 border border-black rounded-lg'>
      <div>{name}</div>
      <img onClick={onClick} alt='cross' className='w-4 h-4' src={cross} />
    </div>
  );
}
