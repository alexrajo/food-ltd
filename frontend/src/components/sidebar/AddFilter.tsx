import useFilter from 'src/hooks/useFilter'
import {
  INCLUDE_FILTER_OPTIONS,
  EXCLUDE_FILTER_OPTIONS,
} from 'src/utils/constants'


type AddFilterProps = {
  type: string
}

/**
 * Container for all the filter options (checkboxes) presented to the user in the sidebar.
 * One for each dropdown menu
 */
export default function AddFilter(props: AddFilterProps) {
  const { type } = props
  const {
    includeFilter,
    excludeFilter,
    removeIncludedFilter,
    removeExcludedFilter,
    includedFilters,
    excludedFilters,
  } = useFilter()
  const add = type === 'include' ? includeFilter : excludeFilter
  const remove =
    type === 'include' ? removeIncludedFilter : removeExcludedFilter
  const filters = type === 'include' ? includedFilters : excludedFilters
  const options =
    type === 'include' ? INCLUDE_FILTER_OPTIONS : EXCLUDE_FILTER_OPTIONS

  const handleCheck = (option: string) => {
    if (filters.includes(option)) {
      remove(option)
    } else {
      add(option)
    }
  }

  return (
    <div className='flex flex-col items-start gap-4'>
      {options.map((option) => (
        <button
          key={option}
          type='button'
          onClick={() => handleCheck(option)}
          className='flex w-full cursor-pointer gap-2 border-b border-b-stone-500 py-2 hover:border-b-stone-600'
        >
          <input
            type='checkbox'
            value={option}
            readOnly
            checked={filters.includes(option)}
          />
          <div>{option}</div>
        </button>
      ))}
    </div>
  )
}
