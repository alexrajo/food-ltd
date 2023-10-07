import { Confinement } from 'src/redux/confinementReducer';
import { Dish, Review } from 'src/types/types';

const URL = '/graphql';

/**
 * Fetches the dish from the database
 * @param dishId The id of the dish to fetch
 * @returns The dish
 */
export const fetchDish = async (dishId?: string): Promise<Dish> => {
  if (!dishId) {
    return Promise.reject('No dishId provided');
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
    .catch((err) => console.log(err));
};

export const fetchReviews = async (page: number, dishId?: string): Promise<Array<Review>> => {
  if (!dishId) {
    return Promise.reject('No dishId provided');
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
    .catch((err) => console.log(err));
};

/**
 * Fetches the dish from the database
 * @param dishId The id of the dish to fetch
 * @returns The dish
 */
export const postReview = async (
  dishId: number,
  title: string,
  rating: number,
  comment: string
): Promise<Review> => {
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
    .catch((err) => console.log(err));
};

export const fetchSearchResults = async (
  filters: Confinement['filters'],
  sortingPreference: Confinement['sortingPreference'],
  keyWord: string,
  page: number
): Promise<Array<Dish>> => {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query ($query: String!,  $page: Integer, $filters: [String], $sortingPreference: String) {
                  dishes(query: $keyWord, page: $page, filters: $filters, sortingPreference: $sortingPreference ) {
                      dish
                  }
                }
                `,
      variables: {
        filters,
        sortingPreference,
        keyWord,
        page,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
