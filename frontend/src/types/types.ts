export type Dish = {
  dishId: number
  title?: string
  ingredients?: string
  instructions?: string
  imageName?: string
  cleanedIngredients: string
}

export type Review = {
  reviewId: number
  title: string
  rating: number
  comment: string
  dishId: number
}
