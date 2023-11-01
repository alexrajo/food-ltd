import {
  includeFilter as includeReduxFilter,
  removeExcludedFilter as removeReduxExcludedFilter,
  excludeFilter as excludeReduxFilter,
  removeIncludedFilter as removeReduxIncludedFilter,
  resetAllFilters,
} from 'src/redux/confinementReducer'
import { useAppDispatch, useAppSelector } from './useAppRedux'
import { useFilterReturnType } from './HookTypes'
import { Ingredient } from 'src/types/types'

/**
 * Hooks which allows to modify the list of filters
 * @example
 * const MyComponent = () => {
 * const { includedIngredients, excludedIngredients, removeIncludedIngredient, excludeIngredient, removeExcludedIngredient, resetFilters, includeIngredient } = useFilter();
 * return (
 * <div>
 * <button onClick={() => includeIngredient('Vegan')}>Add Vegan</button>
 * <button onClick={() => removeIncludedIngredient('Vegan')}>Remove Vegan</button>
 * <button onClick={() => excludeIngredient('Vegan')}>Add Vegan</button>
 * <button onClick={() => removeExcludedIngredient('Vegan')}>Remove Vegan</button>
 * <button onClick={() => resetFilters()}>Reset</button>
 * </div>
 * @returns {useFilterReturnType}
 * @category Hooks
 */
export default function useFilter(): useFilterReturnType {
  /** Grab the states from redux store */
  const includedIngredients = useAppSelector(
    (state) => state.confinements.includedIngredients,
  )
  const excludedIngredients = useAppSelector(
    (state) => state.confinements.excludedIngredients,
  )

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch()

  /** Called when user wishes to include a filter
   * @param {string} option - The filter to include
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { includeFilter } = useFilter();
   * return (
   * <div>
   *  <button onClick={() => includeFilter('Vegan')}>Add Vegan</button>
   * </div>
   * )
   * }
   *
   */
  const includeIngredient = (option: Ingredient): void => {
    /**
     * Check to see if the filter is already in the list
     */
    if (!includedIngredients.includes(option)) {
      dispatch(includeReduxFilter(option))
    }
  }

  /**
   * Removes an included filter
   * @param {string} option - The included filter to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { removeIncludedFilter } = useFilter();
   * return (
   * <div>
   * <button onClick={() => removeIncludedFilter('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  const removeIncludedIngredient = (option: Ingredient): void => {
    /**
     * If the filter is already in the list, remove it
     */
    if (includedIngredients.includes(option)) {
      dispatch(removeReduxIncludedFilter(option))
    }
  }

  /**
   * Adds an excluded filter
   * @param {string} option - The filter to exclude
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { excludeFilter } = useFilter();
   * return (
   * <div>
   * <button onClick={() => excludeFilter('Vegan')}>Add Vegan</button>
   * </div>
   * )
   * }
   */
  const excludeIngredient = (option: Ingredient): void => {
    /**
     * Check to see if the filter is already in the list
     */
    if (!excludedIngredients.includes(option)) {
      dispatch(excludeReduxFilter(option))
    }
  }

  /**
   * Removes an excluded filter
   * @param {string} option - The excluded filter to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { removeExcludedFilter } = useFilter();
   * return (
   * <div>
   * <button onClick={() => removeExcludedFilter('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  const removeExcludedIngredient = (option: Ingredient): void => {
    /**
     * If the filter is already in the list, remove it
     */
    if (excludedIngredients.includes(option)) {
      dispatch(removeReduxExcludedFilter(option))
    }
  }

  /**
   * Resets all filters
   * @returns {void}
   */
  const resetFilters = (): void => {
    dispatch(resetAllFilters())
  }

  return {
    excludedIngredients,
    includedIngredients,
    removeIncludedIngredient,
    excludeIngredient,
    removeExcludedIngredient,
    resetFilters,
    includeIngredient,
  }
}
