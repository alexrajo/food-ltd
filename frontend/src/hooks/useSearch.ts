import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchSearchResults } from 'src/utils/api-calls';
import { useAppDispatch, useAppSelector } from './useAppRedux';
import { setKeyWord } from 'src/redux/confinementReducer';
import { SEARCH_TIMEOUT_MS } from 'src/utils/constants';
import { useSearchReturnType } from './HookTypes';

/**
 * Hooks which allows to search for dishes
 * @example
 * const MyComponent = () => {
 * const { searchInput, onChangeSearchInput, isLoading, error, data, paginate } = useSearch();
 * return (
 * <div>
 *    <input type="text" onChange={(event) => onChangeSearchInput(event)} />
 *    {data.map((dish) => (
 *      <p>{dish.name}</p>
 *    ))}
 *    <button onClick={() => paginate()}>Next Page</button>
 * </div>
 */
function useSearch(): useSearchReturnType {
  /** Raw user input form html element */
  const [searchInput, setSearchInput] = React.useState<string>('');
  /** Page number to allow pagination */
  const [page, setPage] = React.useState<number>(0);

  /** Grab the states from redux store */
  const { includingFilters, excludingFilters, keyWord, sortingPreference } = useAppSelector(
    (state) => state.confinements
  );
  /** User input after 500ms */

  const dispatch = useAppDispatch();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['searchResults', keyWord, page, includingFilters, excludingFilters],
    queryFn: () =>
      fetchSearchResults(includingFilters, excludingFilters, sortingPreference, keyWord, page),
    keepPreviousData: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setKeyWord(searchInput));
    }, SEARCH_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  /**
   * This function refetches the searchresults based
   * on the current confinements
   */
  const onSearch = () => {
    refetch();
  };

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    /** Destruct */
    const { value } = event.target;
    /** Update the state */
    setSearchInput(value);
  };

  const paginate = () => {
    setPage((prev) => prev + 1);
  };

  return { searchInput, onChangeSearchInput, isLoading, error, data, paginate, onSearch };
}

export default useSearch;
