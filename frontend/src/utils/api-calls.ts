import { Confinement } from 'src/redux/confinementReducer'
import { Dish, Review } from 'src/types/types'
import mock_data from '../assets/mockdata.json'

const URL = '/graphql'

/**
 * Fetches the dish from the database
 * @param dishId The id of the dish to fetch
 * @returns The dish
 */
export const fetchDish = async (dishId?: string): Promise<Dish> => {
  if (!dishId) {
    return Promise.reject('No dishId provided')
  }
  // If in development, use the mock data
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(
      mock_data.find((dish) => dish.dishId === parseInt(dishId)) ||
        mock_data[0],
    )
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($dishId: Integer!) {
                  dish(id: $dishId) {
                      dish
                  }
                }
                `,
      variables: {
        dishId,
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
): Promise<Array<Review>> => {
  if (!dishId) {
    return Promise.reject('No dishId provided')
  }
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(
      mock_data.find((dish) => dish.dishId === parseInt(dishId))?.reviews || [],
    )
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($dishId: Integer!, $page: Integer) {
                    reviews(dishId: $dishId, page: $page) {
                        review
                    }
                }
            `,
      variables: {
        dishId,
        page,
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
): Promise<Review> => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      reviewId: 1,
      title,
      rating,
      comment,
      dishId,
    })
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                mutation ($dishId: Integer!, $title: String!, $rating: Integer!, $comment: String!) {
                    postReview(dishId: $dishId, title: $title, rating: $rating, comment: $comment) {
                        review
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
  excludingFilters: Confinement['excludingFilters'],
  includingFilters: Confinement['includingFilters'],
  sortingPreference: Confinement['sortingPreference'],
  keyWord: string,
  page: number,
): Promise<Array<Dish>> => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(
      mock_data.filter((dish) =>
        dish.title.toLowerCase().includes(keyWord.toLowerCase()),
      ),
    )
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($query: String!,  $page: Integer, $includingFilters: [String], $excludingFilters: [String], $sortingPreference: String) {
                  dishes(query: $keyWord, page: $page, includingFilters: $includingFilters, excludingFilters: $excludingFilters,  sortingPreference: $sortingPreference ) {
                      dish
                  }
                }
                `,
      variables: {
        excludingFilters,
        includingFilters,
        sortingPreference,
        keyWord,
        page,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
