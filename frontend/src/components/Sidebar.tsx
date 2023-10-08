import cn from 'src/utils/cn';
import DropDownMenu from './sidebar/DropDownMenu';



export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center px-10 overflow-y-scroll overflow-x-hidden no-scrollbar', className)}>
      <DropDownMenu type='include' />
      <DropDownMenu type='exclude' />
    </div>
  );
}