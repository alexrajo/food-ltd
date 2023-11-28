import { useEffect, useMemo, useState } from 'react'
import FoodGallery from 'src/components/home/FoodGallery'
import Search from 'src/components/home/Search'
import SearchSettingsSquare from 'src/components/home/SearchSettingsSquare'
import SelectedFilters from 'src/components/home/SelectedFilters'
import SortBy from 'src/components/home/SortBy'
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import useSearch from 'src/hooks/useSearch'
import { openNavbar } from 'src/redux/modalsReducer'
import MenuIcon from 'src/components/icons/MenuIcon'
import cn from 'src/utils/cn'

/**
 * Holds all the components that show up on the main page, which are, in order:
 * - The main search bar.
 * - A list of all applied filters to the search result.
 * - A menu for selecting how result should be sorted.
 * - Page navigation menu.
 * - The search result.
 * - Another page navigation menu.
 */
export default function Home() {
  const {
    onSearch,
    onChangeSearchInput,
    searchInput,
    isLoading,
    paginateBackwards,
    paginateForwards,
    data,
    paginateTo,
    page,
  } = useSearch()
  const { data: dishes, pages: rawPages } = data || { data: [] }
  const pages = rawPages || 1

  const [pageInput, setPageInput] = useState(page)

  useEffect(() => {
    setPageInput(page)
  }, [page])

  const pageSuggestions = useMemo(
    () => [
      page > 2 ? 1 : undefined,
      page - 1 > 0 ? page - 1 : undefined,
      page,
      page + 1 < pages ? page + 1 : undefined,
      page < pages ? pages : undefined,
    ],
    [page, pages],
  )

  const keyWord = useAppSelector((state) => state.confinements.keyWord)

  const dispatch = useAppDispatch()

  return (
    <div className='flex w-full '>
      <div className=' flex w-full flex-col gap-2 p-2 sm:p-20'>
        <div className='flex w-full gap-4 '>
          <button
            aria-label='Open Navigation Menu'
            onMouseDown={() => {
              dispatch(openNavbar())
            }}
            type='button'
            className='md group flex h-14 w-14 flex-col items-center justify-center gap-2 rounded border-2 border-black bg-white p-1 px-3 dark:border-tertiarydark dark:bg-secondarydark lg:hidden '
          >
            <MenuIcon
              onMouseDown={() => {
                dispatch(openNavbar())
              }}
            />
          </button>
          <Search
            onSearch={onSearch}
            onChangeSearchInput={onChangeSearchInput}
            searchInput={searchInput}
          />
          <SearchSettingsSquare />
        </div>
        <SelectedFilters />
        {keyWord !== '' && <p>Showing results for: &quot;{keyWord}&quot;</p>}
        <div className='flex flex-col justify-between md:flex-row'>
          <SortBy />
          <div className=' flex flex-row items-center gap-4'>
            <button
              type='button'
              onClick={paginateBackwards}
              className='flex p-2'
            >
              {'<'} Prevous
            </button>
            {/** Make input have the value of page */}
            <input
              aria-label='Go to page number'
              type='text'
              id='page'
              onChange={(e) => {
                if (e.target.value === '') {
                  setPageInput(0)
                  return
                }
                setPageInput(parseInt((e.target as HTMLInputElement).value, 10))
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                paginateTo(parseInt((e.target as HTMLInputElement).value, 10))
              }}
              className='h-10 w-10 rounded-md border text-center text-black outline-none dark:border-0'
              value={pageInput}
            />
            <p>of</p>
            <p>{pages || 1}</p>
            <button
              type='button'
              onClick={paginateForwards}
              className='flex p-2'
            >
              Next {'>'}
            </button>
          </div>
        </div>
        <FoodGallery dishes={dishes} isLoading={isLoading} />

        <div className=' hidden w-full flex-row items-center gap-4 sm:flex '>
          <button
            type='button'
            onClick={paginateBackwards}
            className={cn('flex p-2', page < 2 && 'opacity-50')}
          >
            {'<'} Previous
          </button>
          {pageSuggestions[0] && (
            <button
              type='button'
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[0]!)}
            >
              {pageSuggestions[0]}
            </button>
          )}
          {page > 2 && (
            <p className='flex h-6 w-6 items-center justify-center border-black p-2 tracking-widest dark:border-white'>
              •••
            </p>
          )}
          {pageSuggestions[1] && (
            <button
              type='button'
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[1]!)}
            >
              {pageSuggestions[1]}
            </button>
          )}
          {pageSuggestions[2] && (
            <p className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2 opacity-50 dark:border-white'>
              {pageSuggestions[2]}
            </p>
          )}
          {pageSuggestions[3] && (
            <button
              type='button'
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[3]!)}
            >
              {pageSuggestions[3]}
            </button>
          )}
          {pageSuggestions[3] && pages && pages - pageSuggestions[3] > 1 && (
            <p className='flex h-6 w-6 items-center justify-center border-black p-2 tracking-widest dark:border-white'>
              •••
            </p>
          )}
          {pageSuggestions[4] && (
            <button
              type='button'
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[4]!)}
            >
              {pageSuggestions[4]}
            </button>
          )}
          <button
            type='button'
            onClick={paginateForwards}
            className={cn('flex p-2', page > pages - 1 && 'opacity-50')}
          >
            Next {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
