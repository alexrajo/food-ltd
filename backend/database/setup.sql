CREATE TABLE IF NOT EXISTS dishes (
    dish_id SERIAL PRIMARY KEY,
    title TEXT,
    ingredients TEXT,
    instructions TEXT,
    image_name TEXT,
    cleaned_ingredients TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT NOW(),

    dish_id INTEGER NOT NULL,

    FOREIGN KEY (dish_id) REFERENCES dishes (dish_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT rating_constraint CHECK (rating >= 1 AND rating <= 5)
);

CREATE VIEW dishes_with_review_aggregate AS (
    SELECT dishes.dish_id, dishes.title, dishes.ingredients, dishes.instructions, dishes.image_name, dishes.cleaned_ingredients, AVG(reviews.rating) AS average_rating, COALESCE(COUNT(reviews.review_id), 0) AS review_count
    FROM dishes
    LEFT JOIN reviews ON dishes.dish_id = reviews.dish_id
    GROUP BY dishes.dish_id
);

-- Read the data from the CSV file into the dishes table
COPY dishes (dish_id, title, ingredients, instructions, image_name, cleaned_ingredients)
FROM '/Users/alexrj/Documents/ProgrammingProjects/Web/prosjekt-2-webutvikling/backend/database/dishes.csv'
DELIMITER ','
CSV HEADER;