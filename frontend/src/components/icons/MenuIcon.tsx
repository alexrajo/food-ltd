import cn from 'src/utils/cn'

/* Prop spreading is not allowed according to bnb style guide */
type MenuIconProps = {
  className?: string
  onMouseDown?: () => void
}

export default function MenuIcon(props: MenuIconProps) {
  const { className, onMouseDown } = props
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
      onMouseDown={onMouseDown}
      className={cn('fill-black dark:fill-white', className)}
    >
      <path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z' />
    </svg>
  )
}
