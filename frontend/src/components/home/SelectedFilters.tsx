import useFilter from 'src/hooks/useFilter'
import FilterDisplay from './FilterDisplay'

/**
 * Container for all FilterDisplay components. Situated under the search bar.
 */
export default function SelectedFilters() {
  const { includedIngredients, excludedIngredients, resetFilters } = useFilter()

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {includedIngredients.map((f) => (
        <FilterDisplay key={f.id} filter={f} type='include' />
      ))}
      {excludedIngredients.map((f) => (
        <FilterDisplay key={f.id} filter={f} type='exclude' />
      ))}
      {(includedIngredients.length > 0 || excludedIngredients.length > 0) && (
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
