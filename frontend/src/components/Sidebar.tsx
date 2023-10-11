import cn from 'src/utils/cn'
import DropDownMenu from './sidebar/DropDownMenu'

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'no-scrollbar flex flex-col items-center overflow-x-hidden overflow-y-scroll px-10',
        className,
      )}
    >
      <DropDownMenu type='include' />
      <DropDownMenu type='exclude' />
    </div>
  )
}
