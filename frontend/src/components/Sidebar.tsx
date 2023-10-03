import cn from 'src/utils/cn';
import DropDownMenu from './sidebar/DropDownMenu';


export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center px-10', className)}>
      <DropDownMenu heading="Recipe type" />
      <DropDownMenu heading="Include ingredients" />
      <DropDownMenu heading="Exclude ingredients" />
      <DropDownMenu heading="Time" />
      <DropDownMenu heading="Difficulty" />
    </div>
  );
}