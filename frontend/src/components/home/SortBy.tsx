import useSort from 'src/hooks/useSort'
import cn from 'src/utils/cn'
import { SORTING_OPTIONS } from 'src/utils/constants'

/**
 * Container for all sorting options that can be applied to the dishes.
 * Shows up on the main page, over the FoodGallery. 
 * Gives user option to click on the sorting option they want to 
 * apply to the dishes. 
 */
export default function SortBy() {
  const [sortingPreference, setSortingPreference] = useSort()

  const renderButton = (option: string) => {
    const onClick = () => {
      setSortingPreference(option)
    }
    return (
      <button
        type='button'
        key={option}
        onClick={onClick}
        className={cn(
          'w-20 cursor-pointer text-center font-thin',
          sortingPreference === option &&
            'border-b-4 border-blue-700 font-normal',
        )}
      >
        {option}
      </button>
    )
  }

  return (
    <div className='my-10 flex gap-4'>{SORTING_OPTIONS.map(renderButton)}</div>
  )
}
