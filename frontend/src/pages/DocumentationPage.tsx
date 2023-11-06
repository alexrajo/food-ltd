import { Link, Outlet, useParams } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useAppRedux'
import cn from 'src/utils/cn'

/* Using dynamic routes to fetch the content for each page. 
   There are probably better ways to do this! Feel free to give suggestions.    
*/

/* TODO : move these to a const file or find a better solution. These are used in DocumentationPage and Documentation*/

type Doc = {
  [key: string]: string[]
}

const currentDocs = {
  'running-the-project': [
    'prerequisites',
    'installation',
    'set-up-backend',
    'run-backend',
    'run-frontend',
  ],
  functionality: ['tbd'],
  technology: ['tbd'],
  'testing,-development-and-quality-control': ['tbd'],
}

export default function DocumentationPage() {
  const colorMode = useAppSelector((state) => state.theme.value)

  const { page } = useParams()

  return (
    <div className={cn(colorMode)}>
      <div className='grid h-screen grid-cols-[min-content_auto] grid-rows-[min-content_auto] bg-slate-50 text-black dark:bg-primarydark dark:text-white'>
        {/* Navbar, link back to the main page */}
        <div className='col-span-2 flex items-center justify-center border-b py-4 text-xl font-bold underline'>
          <Link to='/'>Link to Main Application</Link>
        </div>

        {/* Sidebar: list of lists from docs */}
        <div className='flex w-60 flex-col gap-20 px-4 py-10'>
          {Object.entries(currentDocs).map(([title, subsection]) => (
            <div>
              <div className='font-semibold first-letter:uppercase'>
                {title.replace(/-/g, ' ')}
              </div>

              <div className='flex flex-col gap-4 border-l border-slate-100 border-opacity-20'>
                {subsection.map((doc) => (
                  <Link
                    to={doc}
                    key={doc}
                    className={cn(
                      '-ml-px border-l border-transparent pl-4 text-slate-400 hover:border-slate-400 first:mt-2',
                      doc === page && 'border-sky-500',
                    )}
                  >
                    <div
                      className={cn(
                        'first-letter:uppercase',
                        doc === page && 'font-semibold text-sky-500',
                      )}
                    >
                      {doc.replace(/-/g, ' ')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='border-l'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
