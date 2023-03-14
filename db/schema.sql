CREATE DATABASE tatotunes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email text,
    full_name text,
    password_digest text,
    is_contributor BOOL NOT NULL 
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    yt_url TEXT,
    contributor_id INTEGER,
    date_created timestamp
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER,
    user_id INTEGER,
    content TEXT,
    date_created timestamp
);