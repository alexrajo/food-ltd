export type Dish = {
  dishId: number
  title?: string
  ingredients?: string
  instructions?: string
  imageName?: string
  cleanedIngredients: string[]
  averageRating?: number
  reviewCount?: number
}

export type Review = {
  reviewId: number
  title: string
  rating: number
  comment: string
  postedAt: string
  dishId: number
}
