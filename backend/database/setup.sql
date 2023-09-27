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

    dish_id INTEGER NOT NULL,

    FOREIGN KEY (dish_id) REFERENCES dishes (dish_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT rating_constraint CHECK (rating >= 1 AND rating <= 5)
);

-- Read the data from the CSV file into the dishes table
COPY dishes (dish_id, title, ingredients, instructions, image_name, cleaned_ingredients)
FROM '/Users/alexrj/Documents/ProgrammingProjects/Web/prosjekt-2-webutvikling/backend/data/dishes.csv'
DELIMITER ','
CSV HEADER;

