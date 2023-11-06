import { useParams } from 'react-router'
import content from 'src/assets/documentation.json'
/* 
    Based on the params, display the correct documentation.
    This can be done much better, will look into that. Please come with suggestions.
*/

export default function Documentation() {
  const { page } = useParams()

  if (!page) return <div>Select documentation</div>

  const itemList = (page in content ? content[page as keyof typeof content] : ['page does not exist']);
  console.log(itemList)

  return (
    <div className='flex flex-col p-10'>
      <div className='text-lg font-semibold first-letter:uppercase'>
        {page.replace(/-/g, ' ')}
      </div>
      <div className='flex flex-col gap-2 pl-4'>
        {itemList.map((item, i) => (
          <div className='flex items-center gap-4' key={page + item + i}>
            <div className='h-2 w-2 rounded-full bg-white'></div>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
