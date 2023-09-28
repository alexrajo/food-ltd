import React from 'react';
import { useAppDispatch, useAppSelector } from './useAppRedux';
import { setSortingPreference } from 'src/redux/confinementReducer';

export default function useSort() {
  /** Grab the states from redux store */
  const sortingPreference = useAppSelector((state) => state.confinements.sortingPreference);

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch();

  /** Called when user changes sorting preference in the html element
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   * @returns {void}
   */
  const onChangeSortingPreference = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    /** Destruct */
    const { value } = event.target;
    /** Update the value in redux */
    dispatch(setSortingPreference(value));
  };
  return [onChangeSortingPreference, sortingPreference];
}
