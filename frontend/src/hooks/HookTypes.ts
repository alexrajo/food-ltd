import { SortingPreference } from 'src/redux/confinementReducer'
import { Dish, Ingredient, Review } from 'src/types/types'

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
  /**
   * Refetch the data
   */
  refetch: () => void
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
  /**
   * If there are more reviews to load
   */
  hasMore: boolean
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
  sortingPreference: SortingPreference,
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
  onChangeSortingPreference: (option: SortingPreference) => void,
]

export type useFilterReturnType = {
  /** All the included ingredients */
  includedIngredients: Ingredient[]
  /** All the excluded filters */
  excludedIngredients: Ingredient[]
  /** Called when user wishes to include a Ingredient
   * @param {Ingredient} option - The Ingredient to include
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { includeIngredient } = useFilter();
   * return (
   * <div>
   *  <button onClick={() => includeIngredient('Vegan')}>Add Vegan</button>
   * </div>
   * )
   * }
   *
   */
  includeIngredient: (option: Ingredient) => void
  /**
   * Removes an included Ingredient
   * @param {Ingredient} option - The included Ingredient to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { removeIncludedIngredient } = useFilter();
   * return (
   * <div>
   * <button onClick={() => removeIncludedIngredient('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  removeIncludedIngredient: (option: Ingredient) => void
  /**
   * Adds an excluded Ingredient
   * @param {Ingredient} option - The Ingredient to exclude
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { excludeIngredient } = useFilter();
   * return (
   * <div>
   * <button onClick={() => excludeIngredient('Vegan')}>Add Vegan</button>
   * </div>
   * )
   * }
   */
  excludeIngredient: (option: Ingredient) => void
  /**
   * Removes an excluded Ingredient
   * @param {Ingredient} option - The excluded Ingredient to remove
   * @returns {void}
   * @example
   * const MyComponent = () => {
   * const { removeExcludedIngredient } = useFilter();
   * return (
   * <div>
   * <button onClick={() => removeExcludedIngredient('Vegan')}>Remove Vegan</button>
   * </div>
   * )
   * }
   */
  removeExcludedIngredient: (option: Ingredient) => void
  /**
   * Resets all Ingredients
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

// Generate this based on the hook below that uses the returntype
export type useAutoCompleteReturnType = {
  /**
   * If the data is loading
   */
  isLoading: boolean
  /**
   * The included ingredients
   */
  parsedIncludedIngredients: {
    [key: string]: number
  }
  /**
   * The excluded ingredients
   */
  parsedExcludedIngredients: {
    [key: string]: number
  }
}
