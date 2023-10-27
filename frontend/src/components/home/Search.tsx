import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import search from 'src/assets/searchIcon.svg';
import useSearch from 'src/hooks/useSearch';
import useSuggestions from 'src/hooks/useSuggestions';

/**
 * The large search bar on the main page.
 */
type ComponentProps = {
  onSearch: () => void;
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
};
export default function Search(props: ComponentProps) {
  const { onSearch, onChangeSearchInput, searchInput } = props;

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const {
    onChangeSearchInput: onChangeSearchInputSuggestions,
    searchInput: searchInputSuggestions,
    data: suggested,
  } = useSuggestions();

  useEffect(() => {
    if (searchInput.length > 0) {
      setShowSuggestions(true);
    }
  }, [searchInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    setShowSuggestions(false);
    onSearch();
  };

  return (
    <div
      className='relative flex flex-col items-center grow'
      onClick={() => {
        setShowSuggestions(false);
      }}
    >
      <div className='flex items-center border-2 h-14 light:border-black dark:border-tertiarydark rounded-md p-1 w-full flex-row light:bg-white dark:bg-secondarydark'>
        <img src={search} alt='searchIcon' className='w-6 h-6' />
        <input
          type='text'
          className='flex-grow px-4 py-2 rounded-full outline-none light:text-black dark:text-white light:bg-white dark:bg-secondarydark'
          placeholder='Search'
          value={searchInput}
          onChange={(e) => {
            onChangeSearchInput(e);
            onChangeSearchInputSuggestions(e);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showSuggestions && (
        <div className=' light:bg-white dark:bg-secondarydark flex absolute top-16 w-full z-50'>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row gap-4 items-center p-4'>
              <img src={search} alt='searchIcon' className='w-6 h-6' />
              <p>{searchInputSuggestions}</p>
            </div>
            {suggested?.dishes?.length === 0 && (
              <div className='flex flex-row justify-between items-center p-4'>
                <p>No suggestions</p>
              </div>
            )}
            {suggested?.dishes?.splice(0, 5).map((dish) => {
              return (
                <Link
                  to={`/dish/${dish.dishId}`}
                  className='flex flex-row justify-between items-center p-2'
                >
                  <p className=' '>{dish.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
