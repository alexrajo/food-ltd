import { useQuery } from '@tanstack/react-query'
import { useAutoCompleteReturnType } from 'src/hooks/HookTypes'
import { useAppSelector } from 'src/hooks/useAppRedux'
import { fetchIngredientFilterCounts } from 'src/utils/api-calls'
import { INGREDIENTS } from 'src/utils/constants'

/**
 * Hook for the autocomplete functionality
 * @example
 *
 * const MyComponent = () => {
 * const { isLoading, parsedIncludedIngredients, parsedExcludedIngredients } = useAutocomplete()
 *  return (
 *   <div>
 *      {isLoading ? (
 *        <p>Loading...</p>
 *      ) : (
 *        <div>
 *          <p>Included Ingredients</p>
 *          {Object.keys(parsedIncludedIngredients).map((key) => (
 *          <p>{key}</p>
 *      ))}
 *    <p>Excluded Ingredients</p>
 *    {Object.keys(parsedExcludedIngredients).map((key) => (
 *      <p>{key}</p>
 *    ))}
 *    </div>
 *    )}
 *    </div>
 *  )
 * }
 *
 * @returns The parsed included and excluded ingredients
 * @returns Whether the data is loading
 */
export default function useAutocomplete(
  enabled: boolean,
): useAutoCompleteReturnType {
  /** The search input */
  const searchInput = useAppSelector((state) => state.confinements.keyWord)

  /** The included and excluded ingredients */
  const includedIngredients = useAppSelector(
    (state) => state.confinements.includedIngredients,
  )
  const excludedIngredients = useAppSelector(
    (state) => state.confinements.excludedIngredients,
  )

  /** Fetch the data from the api */
  const { isLoading, data: ingredientCount } = useQuery({
    enabled,
    queryKey: [
      'ingredientCounts',
      searchInput,
      includedIngredients,
      excludedIngredients,
    ],
    queryFn: () =>
      fetchIngredientFilterCounts(
        searchInput,
        excludedIngredients,
        includedIngredients,
        INGREDIENTS.map((i) => i.name)
          .filter(
            (name) => !excludedIngredients.map((i) => i.name).includes(name),
          )
          .filter(
            (name) => !includedIngredients.map((i) => i.name).includes(name),
          ),
      ),
    staleTime: 10000,
  })

  /** The included and excluded ingredients as a map */
  const {
    includedIngredients: includedIngredientsMap,
    excludedIngredients: excludedIngredientsMap,
  } =
    ingredientCount && ingredientCount.ingredientFilterCounts
      ? ingredientCount.ingredientFilterCounts.data
      : { includedIngredients: null, excludedIngredients: null }

  /** The parsed included and excluded ingredients */
  const parsedIncludedIngredients = includedIngredientsMap
    ? (JSON.parse(includedIngredientsMap) as {
        [key: string]: number
      })
    : {}
  const parsedExcludedIngredients = excludedIngredientsMap
    ? (JSON.parse(excludedIngredientsMap) as {
        [key: string]: number
      })
    : {}

  return {
    isLoading,
    parsedIncludedIngredients,
    parsedExcludedIngredients,
  }
}
