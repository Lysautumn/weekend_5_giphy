-- creates favorites SQL table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    description varchar(255),
    url varchar(255)
);
