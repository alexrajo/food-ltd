import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { closeFilterMenu } from 'src/redux/modalsReducer'
import { excludeFilter, includeFilter } from 'src/redux/confinementReducer'
import AutocompleteIngredients from 'src/components/sidebar/AutocompleteIngredients'
import IngredientsList from 'src/components/sidebar/IngredientsList'
import useAutocomplete from 'src/hooks/useAutocomplete'
import useFilter from 'src/hooks/useFilter'
import { useEffect, useRef } from 'react'
import XIcon from '../icons/XIcon'

/**
 * For holding the different filters on the right side
 */

export default function FilterMenu() {
  const open = useAppSelector((state) => state.modals.filterMenu)
  const ref = useRef<HTMLButtonElement>(null)

  // Make the site more keyboard navigable by setting focus on an element in the menu as soon as it is opened.
  useEffect(() => {
    if (!open || !ref.current) return
    ref.current.focus()
  }, [open])

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
        <button
          ref={ref}
          type='button'
          aria-label='Close filter menu'
          onClick={() => {
            if (open) {
              dispatch(closeFilterMenu())
            }
          }}
        >
          <XIcon height={36} width={36} />
        </button>
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
