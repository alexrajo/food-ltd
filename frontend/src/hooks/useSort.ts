import { setSortingPreference } from 'src/redux/confinementReducer';
import { useAppDispatch, useAppSelector } from './useAppRedux';

type useSortReturnType = [
  /**
   * The sorting preference
   * @example
   * const MyComponent = () => {
   * const { sortingPreference } = useSort();
   * return (
   * <div>
   *  <p>{sortingPreference}</p>
   * </div>
   * )
   * }
   */
  sortingPreference: string,
  /**
   * Update the sorting preference
   * @param {string} option
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onChangeSortingPreference } = useSort();
   * return (
   * <div>
   * <select onChange={(event) => onChangeSortingPreference(event)}>
   * <option value="name">Name</option>
   * <option value="rating">Rating</option>
   * </select>
   * </div>
   * )
   * }
   *
   */
  onChangeSortingPreference: (option: string) => void,
];

/**
 * Hooks which allows to sort the dishes
 * @example
 * const MyComponent = () => {
 * const { sortingPreference, onChangeSortingPreference } = useSort();
 * return (
 * <div>
 *   <select onChange={(event) => onChangeSortingPreference(event)}>
 *    <option value="name">Name</option>
 *   <option value="rating">Rating</option>
 *  </select>
 *  <p>{sortingPreference}</p>
 * </div>
 */
function useSort(): useSortReturnType {
  /** Grab the states from redux store */
  const sortingPreference = useAppSelector((state) => state.confinements.sortingPreference);

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch();

  /** Called when user changes sorting preference
   * @param {string} option - The sorting preference
   * @returns {void}
   */
  const onClickSortingPreference = (option: string): void => {
    /** Destruct */
    /** Update the value in redux */
    dispatch(setSortingPreference(option));
  };
  return [sortingPreference, onClickSortingPreference];
}

export default useSort;
