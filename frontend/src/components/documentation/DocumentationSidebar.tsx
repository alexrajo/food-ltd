import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { fetchDocs } from 'src/utils/api-calls'
import cn from 'src/utils/cn'

/* 
  Menu for the documentation page. Shows all available documentation sections. 
  User may click on a header to open the content in the documentation outlet.
  The current page is highlighted.
*/
export default function DocumentationSidebar() {
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: fetchDocs,
  })
  const { section: sectionId, subsection: subsectionId } = useParams()
  const fullParam = `/docs/${sectionId}/${subsectionId}`

  if (isLoading || isError) return <div>Loading...</div>

  return (
    <div className='no-scrollbar flex h-80 w-full flex-col gap-10 overflow-y-scroll border-r-0 border-t px-4 py-10 md:h-auto md:w-80 md:border-r md:border-t-0'>
      {sections.map((section, sectionIndex) => (
        <div key={section.title}>
          <div className='font-semibold'>{section.title}</div>
          <div className='flex flex-col gap-4 border-l border-slate-100 border-opacity-20'>
            {section.subsections.map((subsection, subsectionIndex) => {
              const url = `/docs/${sectionIndex}/${subsectionIndex}`
              return (
                <Link
                  key={url}
                  to={url}
                  className={cn(
                    '-ml-px border-l border-transparent pl-4 text-slate-400 first:mt-2 last:mb-2 hover:border-slate-400',
                    url === fullParam && 'border-sky-500',
                  )}
                >
                  <div
                    className={cn(
                      'first-letter:uppercase',
                      url === fullParam && 'font-semibold text-sky-500',
                    )}
                  >
                    {subsection.subtitle}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
