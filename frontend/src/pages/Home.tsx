import { useEffect, useMemo, useState } from 'react'
import Sidebar from 'src/components/Sidebar'
import FoodGallery from 'src/components/home/FoodGallery'
import Search from 'src/components/home/Search'
import SearchSettingsSquare from 'src/components/home/SearchSettingsSquare'
import SelectedFilters from 'src/components/home/SelectedFilters'
import SortBy from 'src/components/home/SortBy'
import useSearch from 'src/hooks/useSearch'

/**
 * Holds all the components that show up on the main page.
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

  return (
    <div className='flex w-full'>
      <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-20'>
        <div className='flex w-full gap-4'>
          <Search
            onSearch={onSearch}
            onChangeSearchInput={onChangeSearchInput}
            searchInput={searchInput}
          />
          <SearchSettingsSquare />
        </div>
        <SelectedFilters />
        <div className='flex flex-row justify-between'>
          <SortBy />
          <div className=' flex flex-row items-center gap-4'>
            <p onClick={paginateBackwards} className=' flex cursor-pointer p-2'>
              {'<'} Prevous
            </p>
            {/** Make input have the value of page */}
            <input
              type='text'
              id='page'
              onChange={(e) => {
                if (e.target.value === '') {
                  setPageInput(0)
                  return
                }
                setPageInput(parseInt((e.target as HTMLInputElement).value))
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                paginateTo(parseInt((e.target as HTMLInputElement).value))
              }}
              className=' h-10 w-10 rounded-md text-center text-black outline-none'
              value={pageInput}
            />
            <p>av</p>
            <p>{pages || 1}</p>
            <p onClick={paginateForwards} className=' flex cursor-pointer p-2'>
              Next {'>'}
            </p>
          </div>
        </div>
        <FoodGallery dishes={dishes} isLoading={isLoading} />

        <div className=' flex w-full flex-row items-center gap-4'>
          <p
            onClick={paginateBackwards}
            className={`flex p-2 ${page < 2 ? 'opacity-50' : 'cursor-pointer'}`}
          >
            {'<'} Prevous
          </p>
          {pageSuggestions[0] && (
            <p
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[0]!)}
            >
              {pageSuggestions[0]}
            </p>
          )}
          {page > 2 && (
            <p className='flex h-6 w-6 items-center justify-center border-black p-2 tracking-widest dark:border-white'>
              •••
            </p>
          )}
          {pageSuggestions[1] && (
            <p
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[1]!)}
            >
              {pageSuggestions[1]}
            </p>
          )}
          {pageSuggestions[2] && (
            <p className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2 opacity-50 dark:border-white'>
              {pageSuggestions[2]}
            </p>
          )}
          {pageSuggestions[3] && (
            <p
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[3]!)}
            >
              {pageSuggestions[3]}
            </p>
          )}
          {pageSuggestions[3] && pages && pages - pageSuggestions[3] > 1 && (
            <p className='flex h-6 w-6 items-center justify-center border-black p-2 tracking-widest dark:border-white'>
              •••
            </p>
          )}
          {pageSuggestions[4] && (
            <p
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2 dark:border-white'
              onClick={() => paginateTo(pageSuggestions[4]!)}
            >
              {pageSuggestions[4]}
            </p>
          )}
          <p
            onClick={paginateForwards}
            className={`flex p-2 ${
              page > pages - 1 ? 'opacity-50' : 'cursor-pointer'
            }`}
          >
            Next {'>'}
          </p>
        </div>
      </div>
    </div>
  )
}
