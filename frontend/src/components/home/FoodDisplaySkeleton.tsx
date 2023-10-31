export default function FoodDisplaySkeleton() {
  return (
    <div className='group flex w-60 animate-pulse cursor-pointer flex-col bg-white shadow-xl dark:bg-secondary'>
      <div className='flex h-40 items-center justify-center rounded-sm bg-secondarydark p-4'>
        <div className=' aspect-square h-full w-full animate-pulse rounded-sm bg-tertiarydark' />
      </div>
      <div className='p-4 font-bold text-black group-hover:underline'>
        <div className=' h-2 w-3/4 animate-pulse rounded-full bg-tertiarydark' />
      </div>
    </div>
  )
}
