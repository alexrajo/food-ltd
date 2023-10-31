/**
 * This is the little box next to the Search bar. Found in the dribble reference.
 * Not clear what should happen when clicked, but now it is here at least.
 */
export default function SearchSettingsSquare() {
  // TODO : find some purpose for this :)
  return (
    <button
      onClick={() => {}}
      type='button'
      className='md group flex h-14 w-14 flex-col items-center justify-center gap-2 rounded border-2 border-black bg-white p-1 px-3 dark:border-tertiarydark dark:bg-secondarydark '
    >
      {/* The rest of this is not relevant, only for styling */}
      <div className='relative w-full border border-black dark:border-white'>
        <div className='absolute -top-1 left-1 h-2 w-2 rounded-full border-2 bg-white transition-all duration-300 group-hover:left-4 dark:bg-secondarydark'></div>
      </div>
      <div className='relative w-full border border-black dark:border-white'>
        <div className='absolute -top-1 left-4 h-2 w-2 rounded-full border-2 bg-white transition-all duration-300 group-hover:left-1 dark:bg-secondarydark'></div>
      </div>
      <div className='relative w-full border border-black dark:border-white'>
        <div className='absolute -top-1 left-1 h-2 w-2 rounded-full border-2 bg-white transition-all duration-300 group-hover:left-4 dark:bg-secondarydark'></div>
      </div>
    </button>
  )
}