import IngredientBox from 'src/components/sidebar/IngredientBox'
import { Ingredient } from 'src/types/types'

type ComponentProps = {
  ingredients: Ingredient[]
}

/**
 * Container for the ingredients used in a filter. Shows up under the filter search bar.
 */
export default function IngredientsList(props: ComponentProps) {
  const { ingredients } = props

  return (
    <div className='flex flex-wrap gap-4'>
      {ingredients.map((ingredient) => (
        <IngredientBox name={ingredient.name} />
      ))}
    </div>
  )
}
