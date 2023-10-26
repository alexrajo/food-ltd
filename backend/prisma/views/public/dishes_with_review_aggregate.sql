SELECT
  dishes.dish_id,
  dishes.title,
  dishes.ingredients,
  dishes.instructions,
  dishes.image_name,
  dishes.cleaned_ingredients,
  avg(reviews.rating) AS average_rating,
  count(reviews.review_id) AS review_count
FROM
  (
    dishes
    LEFT JOIN reviews ON ((dishes.dish_id = reviews.dish_id))
  )
GROUP BY
  dishes.dish_id;