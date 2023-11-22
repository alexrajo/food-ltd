import cn from 'src/utils/cn'

/* Prop spreading is not allowed according to bnb style guide */
type XIconProps = {
  onClick?: () => void
  className?: string
  width?: number
  height?: number
  onMouseDown?: () => void
}

export default function XIcon(props: XIconProps) {

  const { className, onClick, width, height, onMouseDown } = props
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height ?? '24'}
      viewBox='0 -960 960 960'
      width={width ?? '24'}
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={cn('fill-black dark:fill-white', className)}
    >
      <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
    </svg>
  )
}
