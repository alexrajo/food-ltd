import cross from 'src/assets/cross.svg'
import useFilter from 'src/hooks/useFilter'
import { Ingredient } from 'src/types/types'

type FilterDisplayProps = {
  filter: Ingredient
  type: 'include' | 'exclude'
}

/**
 * Information about an individual filter that has been applied to the search result.
 * Component shows up under the search bar when active.
 */
export default function FilterDisplay(props: FilterDisplayProps) {
  const { filter, type } = props
  const { name } = filter
  const { removeExcludedIngredient, removeIncludedIngredient } = useFilter()

  const onClick = () => {
    if (type === 'include') {
      removeIncludedIngredient(filter)
    } else {
      removeExcludedIngredient(filter)
    }
  }

  return (
    <div className='flex items-center gap-2 rounded-lg border border-black p-2 dark:bg-secondarydark'>
      <div className='flex gap-2'>
        <div className=' font-bold first-letter:uppercase'>{type}:</div>
        <div>{name}</div>
      </div>
      <button type='button' onClick={onClick}>
        <img
          alt='remove filter cross'
          className='h-4 w-4 cursor-pointer'
          src={cross}
        />
      </button>
    </div>
  )
}
