import useFilter from 'src/hooks/useFilter';
import FilterDisplay from './FilterDisplay';

export default function SelectedFilters() {
  const { filters, onClickResetFilters } = useFilter();

  return (
    <div className='flex items-center gap-2 flex-wrap'>
      {filters.map((f) => (
        <FilterDisplay key={f} name={f} />
      ))}
      <div onClick={onClickResetFilters} className='font-thin text-sm underline'>
        Clear
      </div>
    </div>
  );
}
