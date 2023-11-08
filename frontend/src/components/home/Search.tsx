import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import search from 'src/assets/searchIcon.svg'
import useSearchHistory from 'src/hooks/useSearchHistory'
import useSuggestions from 'src/hooks/useSuggestions'
import historyIcon from 'src/assets/history.svg'
import XIcon from '../icons/XIcon'

/**
 * The large search bar on the main page.
 */
type ComponentProps = {
  onSearch: () => void
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchInput: string
}
export default function Search(props: ComponentProps) {
  const { onSearch, onChangeSearchInput, searchInput } = props

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    addSearchHistory,
    clearSearchHistory,
    removeSearchHistory,
    searchHistory,
  } = useSearchHistory()

  const {
    onChangeSearchInput: onChangeSearchInputSuggestions,
    searchInput: searchInputSuggestions,
    data: suggestedData,
  } = useSuggestions()

  const suggested = suggestedData ? suggestedData.data : []

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    setShowSuggestions(false)
    if (searchInput.length !== 0) {
      addSearchHistory(searchInput)
    }
    onSearch()
  }

  return (
    <div className=' relative flex flex-grow flex-col items-center'>
      <div className='flex h-14 w-full flex-row items-center rounded-md border-2 border-black bg-white p-1 dark:border-tertiarydark dark:bg-secondarydark'>
        <input
          type='text'
          className='w-full rounded-full bg-white px-2 py-2 text-black outline-none dark:bg-secondarydark dark:text-white'
          placeholder='Search'
          // onFocus={() => {
          //   setShowSuggestions(true);
          // }}
          onBlur={() => {
            setShowSuggestions(false)
          }}
          value={searchInput}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => {
            onChangeSearchInput(e)
            onChangeSearchInputSuggestions(e)
          }}
          onKeyDown={handleKeyDown}
        />
        {searchInput.length > 0 && (
          <XIcon
            className='h-6 w-6 hover:cursor-pointer'
            onMouseDown={() => {
              onChangeSearchInput({
                target: { value: '' },
              } as React.ChangeEvent<HTMLInputElement>)
              setShowSuggestions(false)
            }}
          />
        )}
      </div>
      {showSuggestions && (
        <div className='absolute top-14 z-50 flex w-full overflow-hidden bg-white drop-shadow-md dark:bg-secondarydark'>
          <div className='flex w-full flex-col'>
            {searchInputSuggestions && (
              <button
                type='button'
                className='flex flex-row items-center gap-4 p-4 hover:cursor-pointer hover:bg-tertiarydark'
                onMouseDown={() => {
                  addSearchHistory(searchInput)
                  setShowSuggestions(false)
                  onSearch()
                }}
              >
                <img src={search} alt='searchIcon' className='h-6 w-6' />
                <p>{searchInputSuggestions}</p>
              </button>
            )}
            {suggested.length === 0 && searchHistory && (
              <>
                <div className='flex flex-row items-center justify-between p-2'>
                  <p className=' '>No suggestions</p>
                  <button
                    type='button'
                    onMouseDown={() => {
                      clearSearchHistory()
                    }}
                    className='underline'
                  >
                    Clear history
                  </button>
                </div>
                {searchHistory.map((prevSearch, index) => (
                  <div
                    key={`${index}-${prevSearch}`}
                    className='flex flex-row items-center justify-between p-2'
                  >
                    <div className=' flex flex-row items-center gap-2 '>
                      <img
                        src={historyIcon}
                        alt='searchIcon'
                        className='h-6 w-6'
                      />
                      <p className=' '>{prevSearch}</p>
                    </div>
                    <button
                      type='button'
                      onMouseDown={() => {
                        removeSearchHistory(prevSearch)
                      }}
                      className='underline'
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </>
            )}
            {suggested.splice(0, 5).map((dish) => (
              <button
                type='button'
                key={dish.dishId}
                onMouseDown={() => {
                  navigate(`/dish/${dish.dishId}`)
                }}
                // to={`/dish/${dish.dishId}`}
                className='flex cursor-pointer flex-row items-center gap-2 p-2 hover:bg-tertiarydark'
              >
                <img
                  src={`http://it2810-43.idi.ntnu.no/images/${dish.imageName}.jpg`}
                  alt='dish'
                  className='h-10 w-10 object-cover'
                />
                <p className=' '>{dish.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
