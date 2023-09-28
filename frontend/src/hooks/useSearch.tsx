import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useAppSelector } from './useAppRedux';
import { fetchSearchResults } from 'src/utils/api-calls';

export default function useSearch() {
  /** Raw user input form html element */
  const [searchInput, setSearchInput] = React.useState<string>('');
  /** User input after 500ms */
  const [keyWord, setKeyWord] = React.useState<string>('');
  /** Page number to allow pagination */
  const [page, setPage] = React.useState<number>(0);

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
