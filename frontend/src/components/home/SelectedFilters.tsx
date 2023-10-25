import useFilter from 'src/hooks/useFilter'
import FilterDisplay from './FilterDisplay'

/**
 * Container for all FilterDisplay components. Situated under the search bar.
 */
export default function SelectedFilters() {
  const { includedFilters, excludedFilters, resetFilters } = useFilter()

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {includedFilters.map((f) => (
        <FilterDisplay key={f} name={f} type='include' />
      ))}
      {excludedFilters.map((f) => (
        <FilterDisplay key={f} name={f} type='exclude' />
      ))}
      {(includedFilters.length > 0 || excludedFilters.length > 0) && (
        <button
          type='button'
          onClick={resetFilters}
          className='text-sm font-thin underline'
        >
          Clear
        </button>
      )}
    </div>
  )
}
