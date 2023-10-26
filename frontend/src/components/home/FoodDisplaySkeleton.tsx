export default function FoodDisplaySkeleton() {
  return (
    <div className='group animate-pulse flex w-60 cursor-pointer flex-col light:bg-white dark:bg-tigereye shadow-xl'>
      <div className='flex rounded-sm bg-secondarydark h-40 p-4 items-center justify-center'>
        <div className=' rounded-sm h-full w-full aspect-square animate-pulse bg-tertiarydark' />
      </div>
      <div className='p-4 font-bold text-black group-hover:underline'>
        <div className=' w-3/4 h-2 animate-pulse bg-tertiarydark rounded-full' />
      </div>
    </div>
  );
}
