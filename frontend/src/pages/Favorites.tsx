import React from 'react';

export default function Favorites() {
  return (
    <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-20'>
      <div className='flex flex-row justify-between'>
        <div className=' flex flex-row gap-4 items-center'>
          <p className=' flex p-2 cursor-pointer'>{'<'} Prevous</p>
          {/** Make input have the value of page */}
          <input
            type='text'
            id='page'
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
            }}
            className=' text-center w-10 h-10 rounded-md outline-none text-black'
          />
          <p>av</p>
          <p>10</p>
          <p className=' flex p-2 cursor-pointer'>Next {'>'}</p>
        </div>
      </div>

      <div className=' flex flex-row gap-4 items-center w-full'>
        <p className=' flex p-2 cursor-pointer'>{'<'} Prevous</p>
        <p className=' flex p-2 border-2 items-center justify-center rounded-full w-10 h-10 cursor-pointer'></p>
        <p className=' flex p-2 border-2 items-center justify-center rounded-full w-10 h-10 cursor-pointer'></p>
        <p className=' flex p-2 border-2 items-center justify-center rounded-full w-10 h-10 cursor-pointer'></p>
        <p>...</p>
        <p className=' flex p-2 items-center justify-center border-2 rounded-full w-10 h-10 cursor-pointer'>
          {10}
        </p>
        <p className=' flex p-2 cursor-pointer'>Next {'>'}</p>
      </div>
    </div>
  );
}
