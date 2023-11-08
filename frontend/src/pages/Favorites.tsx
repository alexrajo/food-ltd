/**
 * Currently not in use, since no favourite functionality has been implemented.
 */
export default function Favorites() {
  return (
    <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-20'>
      <div className='flex flex-row justify-between'>
        <div className=' flex flex-row items-center gap-4'>
          <p className=' flex cursor-pointer p-2'>{'<'} Prevous</p>
          {/** Make input have the value of page */}
          <input
            type='text'
            id='page'
            className=' h-10 w-10 rounded-md text-center text-black outline-none'
          />
          <p>av</p>
          <p>10</p>
          <p className=' flex cursor-pointer p-2'>Next {'>'}</p>
        </div>
      </div>

      <div className=' flex w-full flex-row items-center gap-4'>
        <p className=' flex cursor-pointer p-2'>{'<'} Prevous</p>
        <p className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2' />
        <p className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2' />
        <p className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2' />
        <p>...</p>
        <p className=' flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 p-2'>
          {10}
        </p>
        <p className=' flex cursor-pointer p-2'>Next {'>'}</p>
      </div>
    </div>
  )
}
