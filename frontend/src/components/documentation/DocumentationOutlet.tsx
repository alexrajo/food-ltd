import { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { useQuery } from '@tanstack/react-query'
import { fetchDocs } from 'src/utils/api-calls'

const markdownOptions = {
  overrides: {
    ul: (props: { children: ReactNode }) => (
      <ul className='list-disc pl-6'>{props.children}</ul>
    ),
    ol: (props: { children: ReactNode }) => (
      <ol className='list-decimal pl-6'>{props.children}</ol>
    ),
    li: (props: { children: ReactNode }) => (
      <li className='mb-4 text-lg text-slate-100'>{props.children}</li>
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
      <p className="mb-6">{props.children}</p>
    ),
  },
}

export const Documentation = () => {
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
    isNaN(parseInt(sectionId, 10)) ||
    !subsectionId ||
    isNaN(parseInt(subsectionId, 10))
  )
    return <div>param error</div>

  if (isLoading || isError) return <div>Error</div>

  return (
    <div className='p-10 overflow-y-scroll no-scrollbar'>
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
