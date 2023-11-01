import { Confinement } from 'src/redux/confinementReducer'
import { Dish, Review } from 'src/types/types'
import { SORTING_OPTIONS } from 'src/utils/constants'
// import mock_data from '../assets/mockdata.json'

const URL = 'http://127.0.0.1:4000/graphql'

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
    return Promise.reject('No dishId provided')
  }
  // If in development, use the mock data
  // if (process.env.NODE_ENV === 'test') {
  //   return Promise.resolve({
  //     dish:
  //       mock_data.find((dish) => dish.dishId === parseInt(dishId)) ||
  //       mock_data[0],
  //   })
  // }
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
        dishId: parseInt(dishId),
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
  const dishIdNumber = dishId !== undefined ? parseInt(dishId) : undefined

  if (!dishId) {
    return Promise.reject('No dishId provided')
  }
  // if (process.env.NODE_ENV === 'test') {
  //   return Promise.resolve({
  //     reviews:
  //       mock_data.find((dish) => dish.dishId === dishIdNumber)?.reviews || [],
  //   })
  // }
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
  // Use mock data for testing and development
  // if (process.env.NODE_ENV === 'test') {
  //   return Promise.resolve({
  //     dishes: mock_data.filter((dish) =>
  //       dish.title.toLowerCase().includes(keyWord.toLowerCase()),
  //     ),
  //   })
  // }
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
