import cn from 'src/utils/cn'

export default function XIcon(props: React.SVGProps<SVGSVGElement>) {
  const { className } = props
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 -960 960 960'
      width='24'
      {...props}
      className={cn('fill-black dark:fill-white', className)}
    >
      <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
    </svg>
  )
}
