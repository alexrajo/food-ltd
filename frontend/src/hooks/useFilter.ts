import { useAppDispatch, useAppSelector } from './useAppRedux';
import { addFilter, removeFilter, setFilters } from 'src/redux/confinementReducer';

type useFilterReturnType = {
  /**
   * Adds a filter to the list of filters
   * @param {string} option - The filter to add
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onClickAddFilter } = useFilter();
   * return (
   * <div>
   *   <button onClick={() => onClickAddFilter('Vegan')}>Add Vegan</button>
   * </div>
   */
  onClickAddFilter: (option: string) => void;
  /**
   * Removes a filter from the list of filters
   * @param {string} option - The filter to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onClickRemoveFilter } = useFilter();
   * return (
   * <div>
   *  <button onClick={() => onClickRemoveFilter('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  onClickRemoveFilter: (option: string) => void;
  /**
   * Resets the list of filters
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onClickResetFilters } = useFilter();
   * return (
   * <div>
   * <button onClick={() => onClickResetFilters()}>Reset Filters</button>
   * </div>
   * )
   * }
   *
   */
  onClickResetFilters: () => void;
  /**
   * The list of filters
   */
  filters: string[];
};

/**
 * Hooks which allows to modify the list of filters
 * @example
 * const MyComponent = () => {
 * const { onClickAddFilter, onClickRemoveFilter, onClickResetFilters, filters } = useFilter();
 * return (
 * <div>
 *    <button onClick={() => onClickAddFilter('Vegan')}>Add Vegan</button>
 *    <button onClick={() => onClickRemoveFilter('Vegan')}>Remove Vegan</button>
 *    <button onClick={() => onClickResetFilters()}>Reset Filters</button>
 *    <p>{filters}</p>
 * </div>
 */
export default function useFilter(): useFilterReturnType {
  /** Grab the states from redux store */
  const filters = useAppSelector((state) => state.confinements.filters);

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch();

  /** Called when user adds filter preference
   * @param {React.ChangeEvent<HTMLSelectElement>}
   * @returns {void}
   */
  const onClickAddFilter = (option: string): void => {
    /**
     * If the filter is already in the list, remove it
     */
    if (!filters.includes(option)) {
      dispatch(addFilter(option as string));
    }
  };

  /** Called when user removes a filter preference
   * @param {string}
   * @returns {void}
   */
  const onClickRemoveFilter = (option: string): void => {
    /**
     * If the filter is already in the list, remove it
     */
    if (filters.includes(option)) {
      dispatch(removeFilter(option));
    }
  };

  /** Called when user clicks on the reset button
   * to reset the filters
   * @returns {void}
   */
  const onClickResetFilters = (): void => {
    dispatch(setFilters([]));
  };

  return { onClickAddFilter, onClickRemoveFilter, onClickResetFilters, filters };
}
