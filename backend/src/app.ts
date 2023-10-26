import { PrismaClient } from '@prisma/client';
import type { Review } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
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
  }

  type Review {
    reviewId: Int!
    dishId: Int!
    title: String!
    rating: Int!
    comment: String!
    postedAt: String!
  }

  type Query {
    reviews(dishId: Int!, page: Int): [Review]
    dish(id: Int!): Dish
    dishes(query: String!, page: Int, includingFilters: [String], excludingFilters: [String],  sortingPreference: String): [Dish]
  }

  type Mutation {
    postReview(dishId: Int!, title: String!, rating: Int!, comment: String!): Review
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
    const dish = await prisma.dish.findUnique({
      where: {
        dishId: id,
      },
    });
    return dish;
  },

  // Free text search endpoint
  dishes: async ({ query, page }: { query: string; page?: number }) => {
    page = page !== undefined ? page : 1;

    if (query === '') {
      return await prisma.dish.findMany({
        skip: Math.max(0, page - 1) * 10,
        take: 10,
      });
    } else {
      return await prisma.dish.findMany({
        where: {
          title: {
            search: query.split(' ').join(' & '),
          },
        },
        skip: Math.max(0, page - 1) * 10,
        take: 10,
      });
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
    return review;
  },
};

const app = express();

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
