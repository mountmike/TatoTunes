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
    contributor_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    date_created timestamp,
    like_count INTEGER,
    comment_count INTEGER
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    content TEXT,
    date_created timestamp
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    date_created timestamp
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- insert dummy posts into posts

insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Hot Chip - Need You Now', 'potato chips are always good.', 'https://www.youtube.com/embed/lfH5LmhvQQk', 1, CURRENT_TIMESTAMP, 0, 0);
insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Lynyrd Skynyrd - Sweet Home Alabama', 'there’s only one thing sweeter than reese witherspoon when it comes to this track. roasted white delight sweet potatoes. get around it is all we can say.', 'https://www.youtube.com/embed/ye5BuYf8q4o', 1, CURRENT_TIMESTAMP, 0, 0);


insert into comments (post_id, user_id, content, date_created) values (1, 2, 'Very good mate', CURRENT_TIMESTAMP);

