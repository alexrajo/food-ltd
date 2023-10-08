import cn from 'src/utils/cn';
import DropDownMenu from './sidebar/DropDownMenu';
import { INCLUDE_FILTER_OPTIONS, EXCLUDE_FILTER_OPTIONS } from 'src/utils/constants'



export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center px-10', className)}>
      <DropDownMenu filters={INCLUDE_FILTER_OPTIONS} heading="Include ingredients" />
      <DropDownMenu filters={EXCLUDE_FILTER_OPTIONS} heading="Exclude ingredients" />
    </div>
  );
}