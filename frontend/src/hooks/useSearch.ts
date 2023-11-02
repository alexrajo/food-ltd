import { SEARCH_TIMEOUT_MS } from 'src/utils/constants'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { fetchSearchResults } from 'src/utils/api-calls'
import { setKeyWord } from 'src/redux/confinementReducer'
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
  const [searchInput, setSearchInput] = useState<string>('')
  /** Page number to allow pagination */
  const [page, setPage] = useState<number>(1)

  /** Grab the confinements from redux store */
  const {
    includedIngredients,
    excludedIngredients,
    keyWord,
    sortingPreference,
  } = useAppSelector((state) => state.confinements)

  /** Allows to modify the redux store */
  const dispatch = useAppDispatch()

  /** Fetch the data from the api */
  const { isLoading, error, data, refetch } = useQuery({
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
  })

  // useEffect(() => {
  //   /** Set a timeout to avoid calling the api too often */
  //   const timeout = setTimeout(() => {
  //     dispatch(setKeyWord(searchInput));
  //   }, SEARCH_TIMEOUT_MS);
  //   /** Clear the timeout if the user types too fast */
  //   return () => clearTimeout(timeout);
  // }, [searchInput]);

  /** Reset the page number whenever confinements changes */
  useEffect(() => {
    setPage(1)
  }, [includedIngredients, excludedIngredients, keyWord, sortingPreference])

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
    setPage((prev) => prev + 1)
  }

  /**
   * Calling this function will increment the page number
   * and refetches the data
   */
  const paginateBackwards = () => {
    if (page === 1) {
      return
    }
    setPage((prev) => prev - 1)
  }

  /**
   * Calling this function will paginate to a
   * specific number
   */
  const paginateTo = (page: number) => {
    setPage(page)
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
