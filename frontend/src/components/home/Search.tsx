import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import search from 'src/assets/searchIcon.svg';
import useSearch from 'src/hooks/useSearch';
import useSearchHistory from 'src/hooks/useSearchHistory';
import useSuggestions from 'src/hooks/useSuggestions';
import historyIcon from 'src/assets/history.svg';
import x from 'src/assets/x.svg';

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

  const navigate = useNavigate();

  const { addSearchHistory, clearSearchHistory, removeSearchHistory, searchHistory } =
    useSearchHistory();

  const {
    onChangeSearchInput: onChangeSearchInputSuggestions,
    searchInput: searchInputSuggestions,
    data: suggested,
  } = useSuggestions();

  useEffect(() => {
    if (searchInput.length > 0 || searchHistory.length > 0) {
      setShowSuggestions(true);
    }
  }, [searchInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    setShowSuggestions(false);
    if (searchInput.length === 0) return;
    addSearchHistory(searchInput);
    onSearch();
  };

  return (
    <div className=' relative flex flex-col items-center'>
      <div className='flex items-center border-2 h-14 light:border-black dark:border-tertiarydark rounded-md p-1 w-full flex-row light:bg-white dark:bg-secondarydark'>
        <input
          type='text'
          className='flex-grow px-4 py-2 rounded-full outline-none light:text-black dark:text-white light:bg-white dark:bg-secondarydark'
          placeholder='Search'
          // onFocus={() => {
          //   setShowSuggestions(true);
          // }}
          onBlur={() => {
            setShowSuggestions(false);
          }}
          value={searchInput}
          onChange={(e) => {
            onChangeSearchInput(e);
            onChangeSearchInputSuggestions(e);
          }}
          onKeyDown={handleKeyDown}
        />
        {searchInput.length > 0 && (
          <img
            src={x}
            alt='x'
            className='w-6 h-6 hover:cursor-pointer'
            onMouseDown={() => {
              onChangeSearchInput({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
              setShowSuggestions(false);
            }}
          />
        )}
      </div>
      {showSuggestions && (
        <div className=' light:bg-white dark:bg-secondarydark flex absolute top-14 w-full z-50'>
          <div className='flex flex-col w-full'>
            {searchInputSuggestions && (
              <div
                className='flex flex-row gap-4 items-center p-4 hover:cursor-pointer hover:bg-tertiarydark'
                onMouseDown={() => {
                  addSearchHistory(searchInput);
                  setShowSuggestions(false);
                  onSearch();
                }}
              >
                <img src={search} alt='searchIcon' className='w-6 h-6' />
                <p>{searchInputSuggestions}</p>
              </div>
            )}
            {suggested?.dishes?.length === 0 && searchHistory && (
              <>
                <div className='flex flex-row justify-between items-center p-2'>
                  <p className=' '>No suggestions</p>
                  <p
                    onClick={() => {
                      clearSearchHistory();
                    }}
                    className='underline cursor-pointer'
                  >
                    Clear history
                  </p>
                </div>
                {searchHistory.map((search) => {
                  return (
                    <div className='flex flex-row justify-between items-center p-2'>
                      <div className=' flex flex-row items-center gap-2 '>
                        <img src={historyIcon} alt='searchIcon' className='w-6 h-6' />
                        <p className=' '>{search}</p>
                      </div>
                      <p
                        onMouseDown={() => {
                          removeSearchHistory(search);
                        }}
                        className='underline cursor-pointer'
                      >
                        Remove
                      </p>
                    </div>
                  );
                })}
              </>
            )}
            {suggested?.dishes?.splice(0, 5).map((dish) => {
              return (
                <div
                  onMouseDown={() => {
                    navigate(`/dish/${dish.dishId}`);
                  }}
                  // to={`/dish/${dish.dishId}`}
                  className='flex flex-row gap-2 cursor-pointer items-center p-2 hover:bg-tertiarydark'
                >
                  <img
                    src={`http://it2810-43.idi.ntnu.no/images/${dish.imageName}.jpg`}
                    alt='dish'
                    className='w-10 h-10'
                  />
                  <p className=' '>{dish.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
