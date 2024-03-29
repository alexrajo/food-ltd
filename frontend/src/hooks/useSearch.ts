import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { fetchSearchResults } from 'src/utils/api-calls'
import { setKeyWord, setPage } from 'src/redux/confinementReducer'
import { useAppDispatch, useAppSelector } from './useAppRedux'
import { useSearchReturnType } from './HookTypes'

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
  /** Grab the confinements from redux store */
  const {
    page,
    includedIngredients,
    excludedIngredients,
    keyWord,
    sortingPreference,
  } = useAppSelector((state) => state.confinements)

  const [searchInput, setSearchInput] = useState<string>(keyWord)
  /** Allows to modify the redux store */
  const dispatch = useAppDispatch()

  /** Fetch the data from the api */
  const { isLoading, error, data } = useQuery({
    queryKey: [
      'searchResults',
      keyWord,
      page,
      includedIngredients,
      excludedIngredients,
      sortingPreference,
    ],
    queryFn: () =>
      fetchSearchResults(
        excludedIngredients,
        includedIngredients,
        sortingPreference,
        keyWord,
        page,
      ),
    keepPreviousData: true,
    staleTime: 10000,
  })

  /**
   * This function refetches the searchresults based
   * on the current confinements
   */
  const onSearch = () => {
    dispatch(setKeyWord(searchInput))
  }

  const onChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    /** Destruct */
    const { value } = event.target
    /** Update the state */
    setSearchInput(value)
  }

  /**
   * Calling this function will increment the page number
   * and refetches the data
   */
  const paginateForwards = () => {
    if (data?.dishes.data.length === 0 || data?.dishes.pages === page) {
      return
    }
    dispatch(setPage(page + 1))
  }

  /**
   * Calling this function will increment the page number
   * and refetches the data
   */
  const paginateBackwards = () => {
    if (page === 1) {
      return
    }
    dispatch(setPage(page - 1))
  }

  /**
   * Calling this function will paginate to a
   * specific number
   */
  const paginateTo = (pageParam: number) => {
    dispatch(setPage(pageParam))
  }

  const dishesData = data && data.dishes

  return {
    searchInput,
    onChangeSearchInput,
    isLoading,
    error,
    data: dishesData,
    paginateTo,
    paginateForwards,
    paginateBackwards,
    onSearch,
    page,
  }
}

export default useSearch
