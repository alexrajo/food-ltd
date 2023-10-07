import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchSearchResults } from 'src/utils/api-calls';
import { Dish } from 'src/types/types';
import { useAppSelector } from './useAppRedux';

type useSearchReturnType = {
  /**
   * The raw user input
   */
  searchInput: string;
  /**
   * Update the user input
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event from the html element
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onChangeSearchInput } = useSearch();
   * return (
   * <div>
   *  <input type="text" onChange={(event) => onChangeSearchInput(event)} />
   * </div>
   * )
   * }
   */
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * If the data is loading
   */
  isLoading: boolean;
  /**
   * If there is an error
   */
  error: unknown;
  /**
   * The search results
   */
  data: Dish[] | undefined;
  /**
   * Paginate to the next page of search results
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { paginate } = useSearch();
   * return (
   * <div>
   *  <button onClick={() => paginate()}>Next Page</button>
   * </div>
   * )
   * }
   *
   */
  paginate: () => void;
};

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
  /** User input after 500ms */
  const [keyWord, setKeyWord] = React.useState<string>('');
  /** Page number to allow pagination */
  const [page, setPage] = React.useState<number>(0);

  /** Grab the states from redux store */
  const filters = useAppSelector((state) => state.confinements.filters);
  const sortingPreference = useAppSelector((state) => state.confinements.sortingPreference);

  const { isLoading, error, data } = useQuery({
    queryKey: ['searchResults', keyWord, page, filters],
    queryFn: () => fetchSearchResults(filters, sortingPreference, keyWord, page),
    keepPreviousData: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setKeyWord(searchInput);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    /** Destruct */
    const { value } = event.target;
    /** Update the state */
    setSearchInput(value);
  };

  const paginate = () => {
    setPage((prev) => prev + 1);
  };

  return { searchInput, onChangeSearchInput, isLoading, error, data, paginate };
}

export default useSearch;
