import searchIcon from 'src/assets/search.svg';
import loadingIcon from 'src/assets/loading.svg';
import useSearch from 'src/hooks/useSearch';



export default function Search() {
    const { onSearch, onChangeSearchInput, searchInput, isLoading, data } = useSearch()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return
      onSearch()
    }
    console.log(data)

    return (
      <div className="flex">
        <input
          onChange={onChangeSearchInput}
          onKeyDown={handleKeyDown}
          value={searchInput}
          placeholder="Search"
          className="grow h-14 p-4 rounded-l-xl outline-none"
          />
          <div className='bg-white flex items-center'>
            {isLoading && <img src={loadingIcon} className='w-8 bg-transparent animate-spin' />}
          </div>
        <button onClick={onSearch} className="w-14 h-14 flex items-center justify-center rounded-r-xl bg-stone-400 cursor-pointer hover:bg-stone-300">
          <img className='w-8' alt="icon" src={searchIcon} />
        </button>
      </div>
    );
  }