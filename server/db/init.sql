CREATE TABLE users(
    id serial PRIMARY KEY,
    email varchar(128) NOT NULL,
    name varchar(128),
    hash varchar(128) NOT NULL,
    salt varchar(128) NOT NULL
);

CREATE TABLE rounds (
    id serial PRIMARY KEY,
    letter varchar(1) NOT NULL,
    category varchar(8) NOT NULL,
    played_at timestamp NOT NULL,
    words text NOT NULL,
    score int NOT NULL,
    level int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO rounds (
    id, level, letter, category, played_at, words, score, user_id)
VALUES
( 1, 1, 'A', 'animals', '2020-01-01 21:22:23', '["ABYSSINIAN", "ANT", "ALBATROSS"]', 0, 1),
( 2, 2, 'B', 'colors', '2019-01-01 21:22:23', '["BLUE", BRONZE]', 0, 2),
( 3, 3, 'B', 'colors', '2019-02-01 21:22:23', '["BLUE", "BLACK"]', 0, 3),
( 4, 4, 'B', 'colors', '2019-03-01 21:22:23', '["BLUE"]', 0, 1),
( 5, 1, 'B', 'colors', '2019-04-01 21:22:23', '["BLUE", "BLUE-VIOLET", "BUFF"]', 0, 2),
( 6, 2, 'B', 'colors', '2019-05-01 21:22:23', '["BONDI-BLUE", "BUFF", "BROWN"]', 0, 2);

CREATE TABLE words (
    id serial PRIMARY KEY,
    word varchar(64) NOT NULL,
    category varchar(8) NOT NULL,
    letter varchar(1) NOT NULL
);

INSERT INTO users(
    id, email, name, hash, salt)
VALUES
( '1', 'john.doe@polito.it', 'John', 'e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42', '72e4eeb14def3b21'),
( '2', 'mario.rossi@polito.it', 'Mario', 'ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514', 'a8b618c717683608'),
( '3', 'testuser@polito.it', 'Test', '61109c965eac1e50738fca7be39e4c3b73d6689ee72a338c329124835587f092', 'dfsasdf');
