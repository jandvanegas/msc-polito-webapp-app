CREATE table rounds (
  id serial primary key,
  letter varchar(1) not null,
  category varchar(8) not null,
  played_at timestamp not null,
  words text not null
);

INSERT INTO rounds (id, letter, category, played_at, words) 
VALUES 
 (1, 'A', 'animals', '2020-01-01 21:22:23', '["ABYSSINIAN", "ANT", "ALBATROSS"]'),
 (2, 'B', 'colors', '2019-01-01 21:22:23', '["BLUE", BRONZE]'),
 (3, 'B', 'colors', '2019-02-01 21:22:23', '["BLUE", "BLACK"]'),
 (4, 'B', 'colors', '2019-03-01 21:22:23', '["BLUE"]'),
 (5, 'B', 'colors', '2019-04-01 21:22:23', '["BLUE", "BLUE-VIOLET", "BUFF"]'),
 (6, 'B', 'colors', '2019-05-01 21:22:23', '["BONDI-BLUE", "BUFF", "BROWN"]');

CREATE table words (
  id serial primary key,
  word varchar(64) not null,
  category varchar(8) not null,
  letter varchar(1) not null
)

