import FoodGallery from 'src/components/home/FoodGallery'
import Search from 'src/components/home/Search'
import SelectedFilters from 'src/components/home/SelectedFilters'
import SortBy from 'src/components/home/SortBy'

export default function Home() {
  return (
    <div className='flex flex-col gap-2 p-20 w-full'>
      <Search />
      <SelectedFilters />
      <SortBy />
      <FoodGallery />
    </div>
  )
}
