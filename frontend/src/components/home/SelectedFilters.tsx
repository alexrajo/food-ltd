import useFilter from 'src/hooks/useFilter';
import FilterDisplay from './FilterDisplay';

export default function SelectedFilters() {
  const { includedFilters, excludedFilters, resetFilters } = useFilter();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {includedFilters.map((f) => (
        <FilterDisplay key={f} name={f} type='include' />
      ))}
      {excludedFilters.map((f) => (
        <FilterDisplay key={f} name={f} type='exclude' />
      ))}
      {(includedFilters.length > 0 || excludedFilters.length > 0) && (
        <button type='button' onClick={resetFilters} className="font-thin text-sm underline">
          Clear
        </button>
      )}
    </div>
  );
}
