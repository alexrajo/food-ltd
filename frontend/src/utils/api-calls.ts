import { Confinement } from 'src/redux/confinementReducer'
import { Dish, Review } from 'src/types/types'
import mock_data from '../assets/mockdata.json'

const URL = 'http://127.0.0.1:4000/graphql'

/**
 * Fetches the dish from the database
 * @param dishId The id of the dish to fetch
 * @returns The dish
 */
export const fetchDish = async (dishId?: string): Promise<{ dish: Dish }> => {
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
                      title
                      ingredients
                      instructions
                      imageName
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
): Promise<{ reviews: Array<Review> }> => {
  const dishIdNumber = dishId !== undefined ? parseInt(dishId) : undefined

  if (!dishId) {
    return Promise.reject('No dishId provided')
  }
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve({
      reviews:
        mock_data.find((dish) => dish.dishId === dishIdNumber)?.reviews || [],
    })
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($dishId: Int!, $page: Int) {
                    reviews(dishId: $dishId, page: $page) {
                        reviewId
                        title
                        rating
                        comment
                        postedAt
                    }
                }
            `,
      variables: {
        dishId: dishIdNumber,
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
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve({
      reviewId: 1,
      title,
      rating,
      comment,
      dishId,
      postedAt: new Date().toISOString(),
    })
  }
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                mutation ($dishId: Int!, $title: String!, $rating: Int!, $comment: String!) {
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
): Promise<{ dishes: Array<Dish> }> => {
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
              query ($keyWord: String!, $page: Int, $includingFilters: [String], $excludingFilters: [String], $sortingPreference: String) {
                dishes(query: $keyWord, page: $page, includingFilters: $includingFilters, excludingFilters: $excludingFilters, sortingPreference: $sortingPreference) {
                  dishId
                  title
                  imageName
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
