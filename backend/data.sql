DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS avatar CASCADE;
CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text,
    last_name text,
    email text,
    photo_url text,
    is_admin boolean DEFAULT false NOT NULL
);

CREATE TABLE avatar (
    left_arm text,
    right_arm text,
    head text, 
    legs text,
    torso text,
    username text REFERENCES users (username)
    );
-- INSERT INTO users(username, password, first_name, last_name, email, photo_url, is_admin)
-- VALUES ('mike', 'password','michael', 'jamieson','mj@gmail.com', 'txtimgurl', true);
-- INSERT INTO avatar(left_arm, right_arm, head, legs, torso, username)
-- VALUES ('avatar/left_arm/la-bent_efaup8',
-- 'avatar/right_arm/ra-bent_c9a1ue',
-- 'avatar/head/h-t-blush_v6rqon',
-- 'avatar/legs/l-heel_kpee8l',
-- 'avatar/torso/torso-female_tkc6v4',
--  'mike');
-- VALUES ('https://res.cloudinary.com/dreamsprawl/image/upload/v1596454266/avatar/left-arm/la-default_knghhe.png',
-- 'https://res.cloudinary.com/dreamsprawl/image/upload/v1596454328/avatar/right-arm/ra-bent_meypnn.png',
-- 'https://res.cloudinary.com/dreamsprawl/image/upload/v1596454381/avatar/head/h-t-blush_v6rqon.png',
-- 'https://res.cloudinary.com/dreamsprawl/image/upload/v1596455278/avatar/legs/l-heel_kpee8l.png',
-- 'https://res.cloudinary.com/dreamsprawl/image/upload/v1596455490/avatar/torso/torso-male_c1mw30.png',
--  'mike');