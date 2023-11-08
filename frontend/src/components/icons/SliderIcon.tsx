import cn from 'src/utils/cn'

type ComponentProps = {
  active?: boolean
}
export default function SliderIcon(props: ComponentProps) {
  const { active } = props

  return (
    <div
      className={cn(
        'relative flex w-12 rounded-full border-2 border-secondarydark p-1 transition-colors',
        active ? 'bg-secondary' : 'bg-primarydark',
      )}
    >
      <div
        className={cn(
          'flex h-4 w-4 rounded-full bg-white  transition-all',
          active && 'translate-x-5',
        )}
      />
    </div>
  )
}
