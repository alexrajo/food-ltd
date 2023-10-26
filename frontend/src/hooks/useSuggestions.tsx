import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchSearchResults } from 'src/utils/api-calls';
import { useAppSelector } from './useAppRedux';
import { useSuggestionsReturnType } from './HookTypes';

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
function useSuggestions(): useSuggestionsReturnType {
  /** Raw user input form html element */
  const [searchInput, setSearchInput] = useState<string>('');

  const [keyWord, setKeyWord] = useState<string>('');

  const [typing, setTyping] = useState<boolean>(false);

  /** Grab the confinements from redux store */
  const { includingFilters, excludingFilters, sortingPreference } = useAppSelector(
    (state) => state.confinements
  );

  /** Fetch the data from the api */
  const { isLoading, error, data } = useQuery({
    queryKey: ['suggestedSearch', keyWord, includingFilters, excludingFilters],
    queryFn: () =>
      fetchSearchResults(includingFilters, excludingFilters, sortingPreference, keyWord, 1),
    keepPreviousData: true,
  });

  useEffect(() => {
    setTyping(true);
    const timeout = setTimeout(() => {
      setKeyWord(searchInput);
      setTyping(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    /** Destruct */
    const { value } = event.target;
    /** Update the state */
    setSearchInput(value);
  };

  return {
    searchInput,
    onChangeSearchInput,
    isLoading,
    error,
    data,
    typing,
  };
}

export default useSuggestions;
