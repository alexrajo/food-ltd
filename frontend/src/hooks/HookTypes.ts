import { Dish, Review } from 'src/types/types'

export type useDishReturnType = {
  /**
   * The data about the dish
   */
  data: { data: Dish } | undefined
  /**
   * If the data is loading
   */
  isLoading: boolean
  /**
   * If there is an error
   */
  error: unknown
}

export type usePostReviewReturnType = {
  /**
   * The error message
   */
  error: string
  /**
   * If the data is loading
   */
  isLoading: boolean
  /**
   * Sends a review to the backend
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { writeReview } = usePostReview();
   * return (
   * <div>
   *   <button onClick={() => writeReview()}>Submit Review</button>
   * </div>
   * )
   * }
   */
  writeReview: () => void
  /**
   * Update the review text
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onChangeReviewInput } = usePostReview();
   * return (
   * <div>
   *   <input type="text" onChange={(event) => onChangeReviewInput(event)} />
   * </div>
   * )
   * }
   *
   */
  onChangeReviewInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Update the rating
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onChangeRatingInput } = usePostReview();
   * return (
   * <div>
   *  <input type="number" onChange={(event) => onChangeRatingInput(event)} />
   * </div>
   * )
   * }
   *
   */
  onChangeRatingInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type useReviewsReturnType = {
  /**
   * The reviews of a dish
   */
  data: { data: Review[] } | undefined
  /**
   * If the data is loading
   */
  isLoading: boolean
  /**
   * If there an error occured while fetching the data
   */
  error: unknown
  /**
   * Load more to the next page of reviews
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { loadMore } = useReviews();
   * return (
   * <div>
   *   <button onClick={() => loadMore()}>Next Page</button>
   * </div>
   * )
   * }
   *
   */
  loadMore: () => void
}

export type useSortReturnType = [
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
]

export type useFilterReturnType = {
  /** All the included filters */
  includedFilters: string[]
  /** All the excluded filters */
  excludedFilters: string[]
  /** Called when user wishes to include a filter
   * @param {string} option - The filter to include
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { includeFilter } = useFilter();
   * return (
   * <div>
   *  <button onClick={() => includeFilter('Vegan')}>Add Vegan</button>
   * </div>
   * )
   * }
   *
   */
  includeFilter: (option: string) => void
  /**
   * Removes an included filter
   * @param {string} option - The included filter to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { removeIncludedFilter } = useFilter();
   * return (
   * <div>
   * <button onClick={() => removeIncludedFilter('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  removeIncludedFilter: (option: string) => void
  /**
   * Adds an excluded filter
   * @param {string} option - The filter to exclude
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { excludeFilter } = useFilter();
   * return (
   * <div>
   * <button onClick={() => excludeFilter('Vegan')}>Add Vegan</button>
   * </div>
   * )
   * }
   */
  excludeFilter: (option: string) => void
  /**
   * Removes an excluded filter
   * @param {string} option - The excluded filter to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { removeExcludedFilter } = useFilter();
   * return (
   * <div>
   * <button onClick={() => removeExcludedFilter('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  removeExcludedFilter: (option: string) => void
  /**
   * Resets all filters
   * @returns {void}
   */
  resetFilters: () => void
}

export type useSearchReturnType = {
  /**
   * The raw user input
   */
  searchInput: string
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
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * If the data is loading
   */
  isLoading: boolean
  /**
   * If there is an error
   */
  error: unknown
  /**
   * The search results
   */
  data: { pages: number; data: Dish[] } | undefined
  /**
   * Load more to the next page of search results
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { paginateForwards } = useSearch();
   * return (
   * <div>
   *   <button onClick={() => paginateForwards()}>Next Page</button>
   * </div>
   * )
   * }
   *
   */
  paginateForwards: () => void
  /**
   * Load more to the previous page of search results
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { paginateBackwards } = useSearch();
   * return (
   * <div>
   *   <button onClick={() => paginateBackwards()}>Previous Page</button>
   * </div>
   * )
   * }
   *
   */
  paginateBackwards: () => void
  /**
   * Load a specific page of search results
   * @param {number} page - The page to load
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { paginateToPage } = useSearch();
   * return (
   * <div>
   *   <button onClick={() => paginateToPage(2)}>Page 2</button>
   * </div>
   * )
   * }
   *
   */
  paginateTo: (page: number) => void
  /**
   * Refetch the search results
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { onSearch } = useSearch();
   * return (
   * <div>
   *  <button onClick={() => onSearch()}>Search</button>
   * </div>
   * )
   * }
   *
   */
  onSearch: () => void
  /**
   * The current page of search results
   */
  page: number
}

export type useSuggestionsReturnType = {
  /**
   * The raw user input
   */
  searchInput: string
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
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * If the data is loading
   */
  isLoading: boolean
  /**
   * If there is an error
   */
  error: unknown
  /**
   * The search results
   */
  data: { data: Dish[] } | undefined
  /**
   * Whether the user is typing or not
   */
  typing: boolean
}
