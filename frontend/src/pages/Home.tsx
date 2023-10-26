import { useEffect, useState } from 'react';
import Sidebar from 'src/components/Sidebar';
import FoodGallery from 'src/components/home/FoodGallery';
import Search from 'src/components/home/Search';
import SelectedFilters from 'src/components/home/SelectedFilters';
import SortBy from 'src/components/home/SortBy';
import useSearch from 'src/hooks/useSearch';

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
  } = useSearch();
  const { dishes } = data || [];

  const [pageInput, setPageInput] = useState(page);

  useEffect(() => {
    setPageInput(page);
  }, [page]);

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
          <div className=' flex flex-row gap-4 items-center'>
            <p onClick={paginateBackwards} className=' flex p-2 cursor-pointer'>
              {'<'} Prevous
            </p>
            {/** Make input have the value of page */}
            <input
              type='text'
              id='page'
              onChange={(e) => {
                if (e.target.value === '') {
                  setPageInput(0);
                  return;
                }
                setPageInput(parseInt((e.target as HTMLInputElement).value));
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                paginateTo(parseInt((e.target as HTMLInputElement).value));
              }}
              className=' text-center w-10 h-10 rounded-md outline-none text-black'
              value={pageInput}
            />
            <p>av</p>
            <p>10</p>
            <p onClick={paginateForwards} className=' flex p-2 cursor-pointer'>
              Next {'>'}
            </p>
          </div>
        </div>
        <FoodGallery dishes={dishes} isLoading={isLoading} />

        <div className=' flex flex-row gap-4 items-center w-full'>
          <p onClick={paginateBackwards} className=' flex p-2 cursor-pointer'>
            {'<'} Prevous
          </p>
          <p
            className=' flex p-4 border-2 rounded-full aspect-square cursor-pointer'
            onClick={() => paginateTo(page + 1)}
          >
            {page + 1}
          </p>
          <p
            onClick={() => paginateTo(page + 2)}
            className=' flex p-4 border-2 rounded-full aspect-square cursor-pointer'
          >
            {page + 2}
          </p>
          <p className=' flex p-4 border-2 rounded-full aspect-square cursor-pointer'>{page + 3}</p>
          <p>...</p>
          <p
            onClick={() => paginateTo(10)}
            className=' flex p-4 border-2 rounded-full aspect-square cursor-pointer'
          >
            {10}
          </p>
          <p onClick={paginateForwards} className=' flex p-2 cursor-pointer'>
            Next {'>'}
          </p>
        </div>
      </div>
    </div>
  );
}
