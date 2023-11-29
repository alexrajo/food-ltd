import { Link, Outlet } from 'react-router-dom'
import DocumentationSidebar from 'src/components/documentation/DocumentationSidebar'
import { useAppSelector } from 'src/hooks/useAppRedux'
import cn from 'src/utils/cn'

/* 
  A separate page for documentation. Parses a readme file, and presents it
  in a format that makes it easier to navigate.
*/
export default function DocumentationPage() {
  const colorMode = useAppSelector((state) => state.theme.value)

  return (
    <div className={cn(colorMode)}>
      <div className='flex flex-col-reverse h-screen md:grid md:grid-cols-[min-content_auto] md:grid-rows-[min-content_auto] bg-slate-50 text-black dark:bg-primarydark dark:text-white'>
        <div className='col-span-2 flex items-center justify-center border-b py-4 text-xl font-bold underline'>
          <Link to='/'>Link to Main Application</Link>
        </div>
        <DocumentationSidebar />
        <Outlet />
      </div>
    </div>
  )
}
