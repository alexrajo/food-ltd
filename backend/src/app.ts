import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import logger from './middleware/logger';
import dishes from './endpoints/queries/dishes';
import dish from './endpoints/queries/dish';
import reviews from './endpoints/queries/reviews';
import ingredientFilterCounts from './endpoints/queries/ingredientFilterCounts';
import postReview from './endpoints/mutations/postReview';

const PORT = process.env.PORT ?? 4001;

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

// The root provides a resolver function for each API endpoint
const root = {
  reviews,

  dish,

  // Free text search endpoint
  dishes,

  ingredientFilterCounts,

  postReview,
};

const app = express();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(logger); // Log all requests to the console
}
app.use(cors()); // Ensure that the frontend can access this API (ensure preflight requests don't fail)

app.use(
  '/graphql',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
