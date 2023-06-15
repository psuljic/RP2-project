CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    itemname VARCHAR(255) UNIQUE NOT NULL,
    image TEXT NOT NULL,
    link TEXT NOT NULL
);