CREATE DATABASE userloginapp;

CREATE TABLE Users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL

);