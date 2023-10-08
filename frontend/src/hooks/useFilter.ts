import {
  includeFilter as includeReduxFilter,
  removeExcludedFilter as removeReduxExcludedFilter,
  excludeFilter as excludeReduxFilter,
  removeIncludedFilter as removeReduxIncludedFilter,
  resetAllFilters,
} from 'src/redux/confinementReducer';
import { useAppDispatch, useAppSelector } from './useAppRedux';
import { useFilterReturnType } from './HookTypes';

/**
 * Hooks which allows to modify the list of filters
 * @example
 * const MyComponent = () => {
 * const { includeFilter, removeIncludedFilter, excludeFilter, removeExcludedFilter, resetFilters } = useFilter();
 * return (
 * <div>
 *    <button onClick={() => includeFilter('Vegan')}>Add Vegan</button>
 *    <button onClick={() => removeIncludedFilter('Vegan')}>Remove Vegan</button>
 *    <button onClick={() => excludeFilter('Vegan')}>Add Vegan</button>
 *    <button onClick={() => removeExcludedFilter('Vegan')}>Remove Vegan</button>
 *    <button onClick={() => resetFilters()}>Reset Filters</button>
 * </div>
 * )
 * }
 * @returns {useFilterReturnType}
 * @category Hooks
 */
export default function useFilter(): useFilterReturnType {
  /** Grab the states from redux store */
  const includingFilters = useAppSelector((state) => state.confinements.includingFilters);
  const excludeFilters = useAppSelector((state) => state.confinements.excludingFilters);

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch();

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
  const includeFilter = (option: string): void => {
    /**
     * Check to see if the filter is already in the list
     */
    if (!includingFilters.includes(option)) {
      dispatch(includeReduxFilter(option as string));
    }
  };

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
  const removeIncludedFilter = (option: string): void => {
    /**
     * If the filter is already in the list, remove it
     */
    if (includingFilters.includes(option)) {
      dispatch(removeReduxIncludedFilter(option));
    }
  };

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
  const excludeFilter = (option: string): void => {
    /**
     * Check to see if the filter is already in the list
     */
    if (!excludeFilters.includes(option)) {
      dispatch(excludeReduxFilter(option as string));
    }
  };

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
  const removeExcludedFilter = (option: string): void => {
    /**
     * If the filter is already in the list, remove it
     */
    if (excludeFilters.includes(option)) {
      dispatch(removeReduxExcludedFilter(option));
    }
  };

  /**
   * Resets all filters
   * @returns {void}
   */
  const resetFilters = (): void => {
    dispatch(resetAllFilters());
  };

  return {
    includeFilter,
    removeIncludedFilter,
    excludeFilter,
    removeExcludedFilter,
    resetFilters,
  };
}
