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

insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Hot Chip - Need You Now', 'potato chips are always good.', 'https://www.youtube.com/embed/lfH5LmhvQQk', 2, CURRENT_TIMESTAMP, 0, 0);
insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Lynyrd Skynyrd - Sweet Home Alabama', 'there’s only one thing sweeter than reese witherspoon when it comes to this track. roasted white delight sweet potatoes. get around it is all we can say.', 'https://www.youtube.com/embed/ye5BuYf8q4o', 1, CURRENT_TIMESTAMP, 0, 0);
insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Led Zeppelin - Whole Lotta Love', 'when robert plant wrote the lyrics ‘I’m gonna give you my love’ i do believe that he was talking directly to the royal blue potato in his right hand. royal blue potatoes the worlds best', 'https://www.youtube.com/embed/HQmmM_qwG4k', 1, CURRENT_TIMESTAMP, 0, 0);

insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Fergie - Glamorous', 'if poppin’ champaign, flying first class and wearing gold and diamond rings describe your lifestyle than ‘La Bonnotte potatoes’ are for you. Grown only on the French Isle of Noirmoutier, La Bonnotte’s are the worlds most expensive potato. Its been described as one of the most delicate tastes that the palate can perceive, enriched by a nuance of lemon, a salty aftertaste and a vague top note of walnut. “wearing nice lingerie makes me feel really glamorous, i love to splurge on that” - Fergie 2007 to truly enjoy this potato we recommend you to wear your finest ‘Carine Gilsun’ corset, pour a flute of ‘King Brut Vintage 1988′ champagne and sit down on a ‘Lexington Upholstery ‘Salon Sofa’', 'https://www.youtube.com/embed/q0SyUgw98tE', 1, CURRENT_TIMESTAMP, 0, 0);


insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('The Sex Pistols - Anarchy In The U.K.', 'anarchy in the uk? more like anarchy in the potato industry. support the idaho potato commission by listening to authentic punk music like this gem and only buying authentic tatos.', 'https://www.youtube.com/embed/cBojbjoMttI', 2, CURRENT_TIMESTAMP, 0, 0);
insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Chet Faker - Gold', '“when I was a boy, I used to hate potatoes. one day when I was 23 I was tricked into eating a potato salad that I thought was quinoa. since that day my life has never been the same” a quote from chet faker about his breakthrough single “gold” which he recommends is best complimented with a grainy tato salad.', 'https://www.youtube.com/embed/hi4pzKvuEQM', 1, CURRENT_TIMESTAMP, 0, 0);
insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('Oliver Sim - GMT (Jamie xx Remix)', 'I dare you. google Miss Armstrongs Eye Watering Mashed Potatoes recipe on taste.com. If timed correctly, the divine combination of harmony, thickened cream and bone melting vibes created by combinging these two is something that cannot be missed', 'https://www.youtube.com/embed/HOmqPVZSzNg', 2, CURRENT_TIMESTAMP, 0, 0);
insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) values ('A$AP Rocky - Everyday ft. Rod Stewart, Miguel, Mark Ronson', 'mmm dat starch. give me some potato lovin asap.', 'https://www.youtube.com/embed/UtZBA1bVbcs', 1, CURRENT_TIMESTAMP, 0, 0);






 