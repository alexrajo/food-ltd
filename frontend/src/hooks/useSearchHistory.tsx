import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux';
import { addSearch, removeSearch, resetSearch } from 'src/redux/searchHistoryReducer';

export default function useSearchHistory() {
  const searchHistory = useAppSelector((state) => state.searchHistory.value);

  const dispatch = useAppDispatch();

  const addSearchHistory = (search: string) => {
    dispatch(addSearch(search));
  };

  const clearSearchHistory = () => {
    dispatch(resetSearch());
  };

  const removeSearchHistory = (search: string) => {
    dispatch(removeSearch(search));
  };

  return { addSearchHistory, clearSearchHistory, removeSearchHistory, searchHistory };
}
