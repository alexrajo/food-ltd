import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { closeFilterMenu } from 'src/redux/modalsReducer'
import { excludeFilter, includeFilter } from 'src/redux/confinementReducer'
import AutocompleteIngredients from 'src/components/sidebar/AutocompleteIngredients'
import IngredientsList from 'src/components/sidebar/IngredientsList'
import useAutocomplete from 'src/hooks/useAutocomplete'
import useFilter from 'src/hooks/useFilter'
import XIcon from '../icons/XIcon'

/**
 * For holding the different filters on the right side
 */

export default function FilterMenu() {
  const open = useAppSelector((state) => state.modals.filterMenu)

  const menuClass = open ? 'flex' : 'hidden'

  const { isLoading, parsedExcludedIngredients, parsedIncludedIngredients } =
    useAutocomplete(open)

  const { includedIngredients, excludedIngredients } = useFilter()

  const dispatch = useAppDispatch()

  return (
    <div
      className={`fixed right-0 z-50 flex md:h-full ${menuClass} w-full flex-col gap-6 bg-white px-10 py-10 shadow-xl transition-all dark:bg-secondarydark md:w-96`}
    >
      <div className='flex gap-2'>
        <XIcon
          onClick={() => {
            if (open) {
              dispatch(closeFilterMenu())
            }
          }}
          className='hover:cursor-pointer'
          height={36}
          width={36}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-start text-xl font-bold'>Include ingredients</div>
        <AutocompleteIngredients
          isLoading={isLoading}
          parsedIncludedIngredients={parsedIncludedIngredients}
          onChange={(e) =>
            e !== null && dispatch(includeFilter({ id: e.id, name: e.name }))
          }
        />
        <IngredientsList ingredients={includedIngredients} />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-start text-xl font-bold'>Exclude ingredients</div>
        <AutocompleteIngredients
          isLoading={isLoading}
          parsedIncludedIngredients={parsedExcludedIngredients}
          onChange={(e) =>
            e !== null && dispatch(excludeFilter({ id: e.id, name: e.name }))
          }
        />
        <IngredientsList ingredients={excludedIngredients} />
      </div>
    </div>
  )
}
