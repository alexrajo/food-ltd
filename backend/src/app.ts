import { PrismaClient } from '@prisma/client';
import type { Prisma, Review } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLScalarType, Kind, buildSchema } from 'graphql';
import logger from './middleware/logger';
import { getDishesSearchQuery, getIngredientConstraints } from './utils/dbSearch';

const prisma = new PrismaClient();

type ReviewsRequestParams = {
  dishId: number;
  page: number;
  pageSize?: number;
};

type DishRequestParams = {
  id: number;
};

type DishesRequestParams = {
  query: string;
  page: number;
  pageSize?: number;
  includedIngredients?: string[];
  excludedIngredients?: string[];
  sortingPreference?: 'popular' | 'rating' | 'alphabetical';
};

type IngredientFilterCountsRequestParams = {
  query: string;
  includedIngredients: string[];
  excludedIngredients: string[];
  ingredientOptions: string[];
};

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Dish {
    dishId: Int!
    title: String
    ingredients: String
    instructions: String
    imageName: String
    cleanedIngredients: String
    reviewCount: Int
    averageRating: Float
  }

  type Review {
    reviewId: Int!
    dishId: Int!
    title: String!
    rating: Int!
    comment: String!
    postedAt: String!
  }

  type ReviewsResponse {
    data: [Review]
  }

  type DishResponse {
    data: Dish
  }

  type DishesResponse {
    pages: Int!
    data: [Dish]
  }

  type IngredientFilterCountsData {
    includedIngredients: String
    excludedIngredients: String
  }

  type IngredientFilterCountsResponse {
    data: IngredientFilterCountsData
  }

  type PostReviewResponse {
    data: Review
  }

  type Query {
    reviews(dishId: Int!, page: Int!, pageSize: Int): ReviewsResponse
    dish(id: Int!): DishResponse
    dishes(query: String!, page: Int!, pageSize: Int, includedIngredients: [String], excludedIngredients: [String],  sortingPreference: String): DishesResponse
    ingredientFilterCounts(query: String!, includedIngredients: [String]!, excludedIngredients: [String]!, ingredientOptions: [String]!): IngredientFilterCountsResponse
  }

  type Mutation {
    postReview(dishId: Int!, title: String!, rating: Int!, comment: String!): PostReviewResponse
  }
`);

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

const SORTING_OPTIONS = {
  alphabetical: {
    title: 'asc',
  },
  popular: {
    reviewCount: 'desc',
  },
  rating: {
    averageRating: 'desc',
  },
};

// The root provides a resolver function for each API endpoint
const root = {
  reviews: async ({ dishId, page, pageSize }: ReviewsRequestParams) => {
    pageSize = pageSize !== undefined ? pageSize : 10;

    const reviews = await prisma.review.findMany({
      where: {
        dishId: dishId,
      },
      skip: Math.max(0, page - 1) * pageSize,
      take: pageSize,
    });
    return reviews;
  },

  dish: async ({ id }: DishRequestParams) => {
    const dish = await prisma.dishWithReviewAggregate.findUnique({
      where: {
        dishId: id,
      },
    });
    // Change the reviewCount field of the dish to be a number and not a bigint
    const responseDish = dish && {
      ...dish,
      reviewCount: Number(dish.reviewCount),
    };
    return {
      data: responseDish,
    };
  },

  // Free text search endpoint
  dishes: async ({
    query,
    page,
    pageSize,
    sortingPreference,
    includedIngredients,
    excludedIngredients,
  }: DishesRequestParams) => {
    pageSize = pageSize !== undefined ? pageSize : 12;
    page = page !== undefined ? page : 1;

    const sortingOptions: Prisma.DishWithReviewAggregateOrderByWithRelationAndSearchRelevanceInput | undefined =
      sortingPreference !== undefined
        ? (SORTING_OPTIONS[
            sortingPreference
          ] as Prisma.DishWithReviewAggregateOrderByWithRelationAndSearchRelevanceInput)
        : undefined;

    const ingredientConstraints = getIngredientConstraints(includedIngredients, excludedIngredients);

    if (query === '') {
      const data = await prisma.dishWithReviewAggregate.findMany({
        where: {
          AND: ingredientConstraints,
        },
        skip: Math.max(0, page - 1) * pageSize,
        take: pageSize,
        orderBy: sortingOptions,
      });
      const count = await prisma.dish.count({
        where: {
          AND: ingredientConstraints,
        },
      });
      const responseDishes = data.map((dish) => ({
        ...dish,
        reviewCount: Number(dish.reviewCount),
      }));
      return {
        pages: Math.ceil(count / pageSize),
        data: responseDishes,
      };
    } else {
      const data = await prisma.dishWithReviewAggregate.findMany({
        where: {
          title: {
            search: query.split(' ').join(' & '),
          },
          AND: ingredientConstraints,
        },
        skip: Math.max(0, page - 1) * pageSize,
        take: pageSize,
        orderBy: sortingOptions,
      });
      const count = await prisma.dish.count({
        where: {
          title: {
            search: getDishesSearchQuery(query),
          },
          AND: ingredientConstraints,
        },
      });
      const responseDishes = data.map((dish) => ({
        ...dish,
        reviewCount: Number(dish.reviewCount),
      }));
      return {
        pages: Math.ceil(count / pageSize),
        data: responseDishes,
      };
    }
  },

  ingredientFilterCounts: async ({
    query,
    includedIngredients,
    excludedIngredients,
    ingredientOptions,
  }: IngredientFilterCountsRequestParams) => {
    //Explicitly define the types of the variables to a dictionary where the key is a string and the value is a number
    let includedIngredientCounts: { [key: string]: number } = {};
    let excludedIngredientCounts: { [key: string]: number } = {};

    const ingredientConstraints = getIngredientConstraints(includedIngredients, excludedIngredients);

    // Loop through all optional ingredients and count the resulting dishes when they are included or excluded
    if (query === '') {
      for (const [_, ingredient] of ingredientOptions.entries()) {
        const includedCount = await prisma.dish.count({
          where: {
            AND: [...ingredientConstraints, { ingredients: { contains: `%${ingredient}%` } }],
          },
        });
        const excludedCount = await prisma.dish.count({
          where: {
            AND: [...ingredientConstraints, { ingredients: { not: { contains: `%${ingredient}%` } } }],
          },
        });
        includedIngredientCounts[ingredient] = includedCount;
        excludedIngredientCounts[ingredient] = excludedCount;
      }
    } else {
      for (const [_, ingredient] of ingredientOptions.entries()) {
        const includedCount = await prisma.dish.count({
          where: {
            title: {
              search: getDishesSearchQuery(query),
            },
            AND: [...ingredientConstraints, { ingredients: { contains: `%${ingredient}%` } }],
          },
        });
        const excludedCount = await prisma.dish.count({
          where: {
            title: {
              search: getDishesSearchQuery(query),
            },
            AND: [...ingredientConstraints, { ingredients: { not: { contains: `%${ingredient}%` } } }],
          },
        });

        includedIngredientCounts[ingredient] = includedCount;
        excludedIngredientCounts[ingredient] = excludedCount;
      }
    }

    // Return the counts as stringified JSON objects, so that they can be parsed on the frontend
    return {
      data: {
        includedIngredients: JSON.stringify(includedIngredientCounts),
        excludedIngredients: JSON.stringify(excludedIngredientCounts),
      },
    };
  },

  postReview: async ({ dishId, title, rating, comment }: Omit<Review, 'reviewId'>) => {
    const review = await prisma.review.create({
      data: {
        dishId,
        title,
        rating,
        comment,
        // postedAt is automatically set by the database
      },
    });
    return { data: review };
  },
};

const app = express();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(logger); // Log all requests to the console
}
app.use(cors(corsOptions)); // Ensure that the frontend can access this API (ensure preflight requests don't fail)

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
