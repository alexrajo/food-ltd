import React from 'react';
import { useAppDispatch, useAppSelector } from './useAppRedux';
import { addFilter, removeFilter, setFilters } from 'src/redux/confinementReducer';

export default function useFilter() {
  /** Grab the states from redux store */
  const filters = useAppSelector((state) => state.confinements.filters);

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch();

  /** Called when user changes filter preference in the html element
   * @param {React.ChangeEvent<HTMLSelectElement>}
   * @returns {void}
   */
  const onClickFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    /** Destruct */
    const { value } = event.target;
    /**
     * If the filter is already in the list, remove it
     */
    if (filters.includes(value)) {
      dispatch(removeFilter(value));
      return;
    }
    dispatch(addFilter(value as string));
  };

  /** Called when user clicks on the reset button
   * to reset the filters
   * @returns {void}
   */
  const onClickResetFilters = (): void => {
    dispatch(setFilters([]));
  };

  return { onClickFilter, onClickResetFilters, filters };
}
