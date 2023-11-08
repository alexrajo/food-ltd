# GrapQL API

## Queries

### dishes

Get/search for dishes given a query text in addition to sorting and filtering preferences, with pagination.

### dish

Get dish info given a dishId.

### reviews

Get the reviews of a given dish, with pagination.

### ingredientFilterCounts

Get the resulting query result size from applying different available filters based on given search query parameters.

## Mutations

### postReview

Post a review on a dish. A "postedAt" field is automatically applied to the review.

## GraphQL Schema

```graphql
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

  dishes(
    query: String!
    page: Int!
    pageSize: Int
    includedIngredients: [String]
    excludedIngredients: [String]
    sortingPreference: String
  ): DishesResponse

  ingredientFilterCounts(
    query: String!
    includedIngredients: [String]!
    excludedIngredients: [String]!
    ingredientOptions: [String]!
  ): IngredientFilterCountsResponse
}

type Mutation {
  postReview(dishId: Int!, title: String!, rating: Int!, comment: String!): PostReviewResponse
}
```
