import { useEffect, useState } from 'react'
import Sidebar from 'src/components/Sidebar'
import FoodGallery from 'src/components/home/FoodGallery'
import Search from 'src/components/home/Search'
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
  const { data: dishes, pages } = data || { data: [] }

  const [pageInput, setPageInput] = useState(page)

  useEffect(() => {
    setPageInput(page)
  }, [page])

  return (
    <div className='flex w-full'>
      <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-20'>
        <Search
          onSearch={onSearch}
          onChangeSearchInput={onChangeSearchInput}
          searchInput={searchInput}
        />
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
          <p onClick={paginateBackwards} className=' flex cursor-pointer p-2'>
            {'<'} Prevous
          </p>
          <p
            className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2'
            onClick={() => paginateTo(page + 1)}
          >
            {page + 1}
          </p>
          <p
            onClick={() => paginateTo(page + 2)}
            className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2'
          >
            {page + 2}
          </p>
          <p
            onClick={() => paginateTo(page + 3)}
            className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2'
          >
            {page + 3}
          </p>
          <p>...</p>
          <p
            onClick={() => paginateTo(pages || 1)}
            className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2'
          >
            {pages || 1}
          </p>
          <p onClick={paginateForwards} className=' flex cursor-pointer p-2'>
            Next {'>'}
          </p>
        </div>
      </div>
    </div>
  )
}
