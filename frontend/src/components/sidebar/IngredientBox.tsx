type ComponentProps = {
  name: string
}
/**
 * Container for the name of an ingredient that has been used in a filter.
 * Shows up under the search bar for applying filter.
 */
export default function IngredientBox(props: ComponentProps) {
  const { name } = props

  return (
    <div className='flex flex-col items-center justify-center rounded-md border bg-secondary px-2'>
      <div className='text-sm font-bold text-black'>{name}</div>
    </div>
  )
}
