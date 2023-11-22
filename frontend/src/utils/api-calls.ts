import { Confinement } from 'src/redux/confinementReducer'
import { Dish, Review } from 'src/types/types'
import { SORTING_OPTIONS } from 'src/utils/constants'
import mock_dishes from 'src/tests/mock/dishes.json'
import mock_reviews from 'src/tests/mock/reviews.json'
import mock_ingredients from 'src/tests/mock/ingredients.json'
import readme from '../../../README.md'
import { Section, readmeParser } from './readmeParse'

const URL = `http://${
  process.env.NODE_ENV === 'production' ? 'it2810-43.idi.ntnu.no' : '127.0.0.1'
}:4000/graphql`

type FetchDishResponse = {
  dish: {
    data: Dish
  }
}

type FetchDishesResponse = {
  dishes: {
    data: Array<Dish>
    pages: number
  }
}

type FetchReviewsResponse = {
  reviews: {
    data: Array<Review>
  }
}

export type FetchIngredientFilterCountsResponse = {
  ingredientFilterCounts: {
    data: {
      includedIngredients: string
      excludedIngredients: string
    }
  }
}

type PostReviewResponse = {
  postReview: {
    data: Review
  }
}

/**
 * Fetches the dish from the database
 * @param dishId The id of the dish to fetch
 * @returns The dish
 */
export const fetchDish = async (
  dishId?: string,
): Promise<FetchDishResponse> => {
  if (!dishId) {
    return Promise.reject(new Error('No dishId provided'))
  }
  // If testing, use the mock data
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve({
      dish: {
        data:
          mock_dishes.find((dish) => dish.dishId.toString() === dishId) ??
          mock_dishes[0],
      },
    })
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($dishId: Int!) {
                  dish(id: $dishId) {
                      data {
                        title
                        ingredients
                        instructions
                        imageName
                        averageRating
                        reviewCount
                      }
                  }
                }
                `,
      variables: {
        dishId: parseInt(dishId, 10),
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const fetchReviews = async (
  page: number,
  dishId?: string,
  pageSize?: number,
): Promise<FetchReviewsResponse> => {
  const dishIdNumber = dishId !== undefined ? parseInt(dishId, 10) : undefined

  if (!dishId) {
    return Promise.reject(new Error('No dishId provided'))
  }

  // Use mock data for testing
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve({
      reviews: {
        data: mock_reviews.filter(
          (review) => review.dishId.toString() === dishId,
        ),
      },
    })
  }

  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($dishId: Int!, $page: Int!, $pageSize: Int) {
                    reviews(dishId: $dishId, page: $page, pageSize: $pageSize) {
                      data {
                        reviewId
                        title
                        rating
                        comment
                        postedAt
                      }
                    }
                }
            `,
      variables: {
        dishId: dishIdNumber,
        page,
        pageSize,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

/**
 * Fetches the dish from the database
 * @param dishId The id of the dish to fetch
 * @returns The dish
 */
export const postReview = async (
  dishId: number,
  title: string,
  rating: number,
  comment: string,
): Promise<PostReviewResponse> => {
  // if (process.env.NODE_ENV === 'test') {
  //   return Promise.resolve({
  //     reviewId: 1,
  //     title,
  //     rating,
  //     comment,
  //     dishId,
  //     postedAt: new Date().toISOString(),
  //   })
  // }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                mutation ($dishId: Int!, $title: String!, $rating: Int!, $comment: String!) {
                    postReview(dishId: $dishId, title: $title, rating: $rating, comment: $comment) {
                        data {
                          reviewId
                          title
                        }
                    }
                }
                `,
      variables: {
        dishId,
        title,
        rating,
        comment,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const fetchSearchResults = async (
  excludedIngredients: Confinement['excludedIngredients'],
  includedIngredients: Confinement['includedIngredients'],
  sortingPreference: Confinement['sortingPreference'],
  keyWord: string,
  page: number,
  pageSize?: number,
): Promise<FetchDishesResponse> => {
  //Use mock data for testing
  if (process.env.NODE_ENV === 'test') {
    const response: FetchDishesResponse = {
      dishes: {
        data: mock_dishes,
        pages: 1, // Set the appropriate number of pages
      },
    }

    return Promise.resolve(response)
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
              query ($keyWord: String!, $page: Int!, $pageSize: Int, $includedIngredients: [String], $excludedIngredients: [String], $sortingPreference: String) {
                dishes(query: $keyWord, page: $page, pageSize: $pageSize, includedIngredients: $includedIngredients, excludedIngredients: $excludedIngredients, sortingPreference: $sortingPreference) {
                  data {
                    dishId
                    title
                    imageName
                    averageRating
                    reviewCount
                  }
                  pages
                }
              }
      `,
      variables: {
        excludedIngredients: excludedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        includedIngredients: includedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        sortingPreference: SORTING_OPTIONS[sortingPreference],
        keyWord,
        page,
        pageSize,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const fetchIngredientFilterCounts = async (
  query: string,
  excludedIngredients: Confinement['excludedIngredients'],
  includedIngredients: Confinement['includedIngredients'],
  ingredientOptions: string[],
): Promise<FetchIngredientFilterCountsResponse> => {
  // For mocking
  if (process.env.NODE_ENV === 'test') {
    const response: FetchIngredientFilterCountsResponse = {
      ingredientFilterCounts: {
        data: {
          includedIngredients: JSON.stringify(mock_ingredients),
          excludedIngredients: '',
        },
      },
    }

    return Promise.resolve(response)
  }

  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
              query ($query: String!, $includedIngredients: [String]!, $excludedIngredients: [String]!, $ingredientOptions: [String]!) {
                ingredientFilterCounts(query: $query, includedIngredients: $includedIngredients, excludedIngredients: $excludedIngredients, ingredientOptions: $ingredientOptions) {
                  data {
                    includedIngredients
                    excludedIngredients
                  }
                }
              }
      `,
      variables: {
        query,
        excludedIngredients: excludedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        includedIngredients: includedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        ingredientOptions,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

/**
 * Fetches content from readme file. Tanstack query caches this result,
 * so fetching should only occur once.
 * @returns parsed content, for use on the documentation page.
 */
export const fetchDocs = async (): Promise<Section[]> => {
  const res = await fetch(readme)
  if (!res.ok) throw Error('not ok')
  const content = await res.text()
  return readmeParser(content).slice(1)
}
