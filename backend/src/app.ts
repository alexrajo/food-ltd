import { PrismaClient } from '@prisma/client';
import type { Review } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLScalarType, Kind, buildSchema } from 'graphql';
import logger from './middleware/logger';

const prisma = new PrismaClient();

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

  type PostReviewResponse {
    data: Review
  }

  type Query {
    reviews(dishId: Int!, page: Int): ReviewsResponse
    dish(id: Int!): DishResponse
    dishes(query: String!, page: Int, includingFilters: [String], excludingFilters: [String],  sortingPreference: String): DishesResponse
  }

  type Mutation {
    postReview(dishId: Int!, title: String!, rating: Int!, comment: String!): PostReviewResponse
  }
`);

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

// The root provides a resolver function for each API endpoint
const root = {
  reviews: async ({ dishId, page }: { dishId: number; page: number }) => {
    const reviews = await prisma.review.findMany({
      where: {
        dishId: dishId,
      },
      skip: Math.max(0, page - 1) * 10,
      take: 10,
    });
    return reviews;
  },

  dish: async ({ id }: { id: number }) => {
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
  dishes: async ({ query, page }: { query: string; page?: number }) => {
    const pageSize = 10;
    page = page !== undefined ? page : 1;

    if (query === '') {
      const data = await prisma.dishWithReviewAggregate.findMany({
        skip: Math.max(0, page - 1) * 10,
        take: 10,
      });
      const count = await prisma.dish.count();
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
        },
        skip: Math.max(0, page - 1) * 10,
        take: 10,
      });
      const count = await prisma.dish.count({
        where: {
          title: {
            search: query.split(' ').join(' & '),
          },
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
