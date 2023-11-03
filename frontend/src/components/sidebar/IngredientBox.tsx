type ComponentProps = {
  name: string
}
export default function IngredientBox(props: ComponentProps) {
  const { name } = props

  return (
    <div
      className='flex flex-col items-center justify-center rounded-md border bg-secondary px-2'
    >
      <div className='text-sm font-bold '>{name}</div>
    </div>
  )
}
