import { PrismaClient, Review, Dish } from '@prisma/client';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const prisma = new PrismaClient();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
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
  }

  type Query {
    reviews(dishId: Int!, page: Int): [Review]
    dish(id: Int!): Dish
  }

  type Mutation {
    postReview(dishId: Int!, title: String!, rating: Int!, comment: String!): Review
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  reviews: async ({ dishId, page }: { dishId: number; page: number }) => {
    const reviews = await prisma.review.findMany({
      where: {
        dishId: dishId,
      },
      skip: Math.max(1, page - 1) * 10,
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

  postReview: async ({
    dishId,
    title,
    rating,
    comment,
  }: Omit<Review, 'review_id'>) => {
    const review = await prisma.review.create({
      data: {
        dishId,
        title,
        rating,
        comment,
      },
    });
    return review;
  },
};

var app = express();
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
