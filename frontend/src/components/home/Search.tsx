import searchIcon from 'src/assets/search.svg'
import loadingIcon from 'src/assets/loading.svg'
import useSearch from 'src/hooks/useSearch'

export default function Search() {
  const { onSearch, onChangeSearchInput, searchInput, isLoading } = useSearch()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    onSearch()
  }

  return (
    <div className='flex'>
      <input
        onChange={onChangeSearchInput}
        onKeyDown={handleKeyDown}
        value={searchInput}
        placeholder='Search'
        className='h-14 grow rounded-l-xl p-4 outline-none'
      />
      <div className='flex items-center bg-white'>
        {isLoading && (
          <img
            alt='loading spinner'
            src={loadingIcon}
            className='w-8 animate-spin bg-transparent'
          />
        )}
      </div>
      <button
        type='button'
        onClick={onSearch}
        className='flex h-14 w-14 cursor-pointer items-center justify-center rounded-r-xl bg-stone-400 hover:bg-stone-300'
      >
        <img className='w-8' alt='searchicon' src={searchIcon} />
      </button>
    </div>
  )
}
