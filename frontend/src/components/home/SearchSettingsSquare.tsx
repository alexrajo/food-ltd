import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { closeFilterMenu, openFilterMenu } from 'src/redux/modalsReducer'

/**
 * This is the little box next to the Search bar. When clicked,
 * a menu opens to allow user to apply filters to the search result.
 */
export default function SearchSettingsSquare() {
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.modals.filterMenu)

  return (
    <button
      onClick={() => {
        if (open) {
          dispatch(closeFilterMenu())
        } else {
          dispatch(openFilterMenu())
        }
      }}
      type='button'
      data-testid='searchsettingsquare'
      className='md group flex h-14 w-14 flex-col items-center justify-center gap-2 rounded border-2 border-black bg-white p-1 px-3 dark:border-tertiarydark dark:bg-secondarydark '
    >
      {/* The rest of this is not relevant, only for styling */}
      <div className='relative w-full border border-black dark:border-white'>
        <div className='absolute -top-1 left-1 h-2 w-2 rounded-full border-2 border-black bg-white transition-all duration-300 group-hover:left-4 dark:border-white dark:bg-secondarydark' />
      </div>
      <div className='relative w-full border border-black dark:border-white'>
        <div className='absolute -top-1 left-4 h-2 w-2 rounded-full border-2 border-black bg-white transition-all duration-300 group-hover:left-1 dark:border-white dark:bg-secondarydark' />
      </div>
      <div className='relative w-full border border-black dark:border-white'>
        <div className='absolute -top-1 left-1 h-2 w-2 rounded-full border-2 border-black bg-white transition-all duration-300 group-hover:left-4 dark:border-white dark:bg-secondarydark' />
      </div>
    </button>
  )
}
