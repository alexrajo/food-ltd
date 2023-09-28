import { Dish, PrismaClient } from '@prisma/client';

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const prisma = new PrismaClient();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    reviews(dishId: Int!, page: Int): [Review]
    dish(id: Int!): Dish
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  reviews: async ({ dishId, page }: { dishId: number; page: number }) => {
    const reviews = await prisma.reviews.findMany({
      where: {
        dish_id: dishId,
      },
      skip: page * 10,
      take: 10,
    });
    return reviews;
  },
  dish: async ({ id }: { id: number }) => {
    const dish = await prisma.dishes.findUnique({
      where: {
        dish_id: id,
      },
    });
    return dish;
  },
};

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
