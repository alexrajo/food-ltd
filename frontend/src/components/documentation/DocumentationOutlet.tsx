import { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { useQuery } from '@tanstack/react-query'
import { fetchDocs } from 'src/utils/api-calls'

/* 
  Style settings for the markdown renderer. These are needed to style with tailwind.
*/
const markdownOptions = {
  overrides: {
    ul: (props: { children: ReactNode }) => (
      <ul className='list-disc pl-6'>{props.children}</ul>
    ),
    ol: (props: { children: ReactNode }) => (
      <ol className='list-decimal pl-6'>{props.children}</ol>
    ),
    li: (props: { children: ReactNode }) => (
      <li className='mb-4 text-lg text-slate-800 dark:text-slate-100'>
        {props.children}
      </li>
    ),
    h1: (props: { children: ReactNode }) => (
      <h1 className='my-4 text-4xl font-bold'>{props.children}</h1>
    ),
    h2: (props: { children: ReactNode }) => (
      <h2 className='my-3 text-3xl font-semibold '>{props.children}</h2>
    ),
    h3: (props: { children: ReactNode }) => (
      <h3 className='my-2 text-2xl font-semibold'>{props.children}</h3>
    ),
    p: (props: { children: ReactNode }) => (
      <p className='mb-6'>{props.children}</p>
    ),
    table: (props: { children: ReactNode }) => (
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-300'>
          {props.children}
        </table>
      </div>
    ),

    thead: (props: { children: ReactNode }) => (
      <thead className='bg-gray-200 dark:bg-gray-800'>{props.children}</thead>
    ),

    tbody: (props: { children: ReactNode }) => (
      <tbody className='divide-y divide-gray-300'>{props.children}</tbody>
    ),

    tr: (props: { children: ReactNode }) => <tr>{props.children}</tr>,

    th: (props: { children: ReactNode }) => (
      <th className='px-4 py-2 text-left font-semibold'>{props.children}</th>
    ),

    td: (props: { children: ReactNode }) => (
      <td className='px-4 py-2'>{props.children}</td>
    ),
    code: (props: { children: ReactNode }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-md text-sm font-mono text-gray-800 dark:text-gray-200">
        {props.children}
      </code>
    ),
  },
}

/* 
  The display of selected documentation paragraph. Simply rendering the markdown of the selected section.
*/
export default function Documentation() {
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: fetchDocs,
  })
  const { section: sectionId, subsection: subsectionId } = useParams()

  if (
    !sectionId ||
    Number.isNaN(parseInt(sectionId, 10)) ||
    !subsectionId ||
    Number.isNaN(parseInt(subsectionId, 10))
  )
    return <div>param error</div>

  if (isLoading || isError) return <div>Error</div>

  return (
    <div className='no-scrollbar overflow-y-scroll p-10'>
      {sections.length > 0 && (
        <Markdown options={markdownOptions}>
          {
            sections[parseInt(sectionId, 10)].subsections[
              parseInt(subsectionId, 10)
            ].content
          }
        </Markdown>
      )}
    </div>
  )
}
