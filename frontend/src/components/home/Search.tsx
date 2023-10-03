import searchIcon from 'src/assets/search.svg';

export default function Search() {
    return (
      <div className="flex">
        <input
          placeholder="Search"
          className="grow h-14 p-4 rounded-l-xl outline-none"
        />
        <div className="w-14 h-14 flex items-center justify-center rounded-r-xl bg-stone-400">
          <img alt="icon" src={searchIcon} />
        </div>
      </div>
    );
  }