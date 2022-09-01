CREATE TABLE users(
    id integer primary key autoincrement,
    email varchar(128) NOT NULL,
    name varchar(128),
    hash varchar(128) NOT NULL,
    salt varchar(128) NOT NULL
);

CREATE TABLE rounds (
    id integer primary key autoincrement,
    letter varchar(1) NOT NULL,
    category varchar(8) NOT NULL,
    played_at timestamp NOT NULL,
    words text NOT NULL,
    score int NOT NULL,
    level int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO users(
    id, email, name, hash, salt)
VALUES
( '1', 'john.doe@polito.it', 'John', 'e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42', '72e4eeb14def3b21'),
( '2', 'mario.rossi@polito.it', 'Mario', 'ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514', 'a8b618c717683608'),
( '3', 'testuser@polito.it', 'Test', '61109c965eac1e50738fca7be39e4c3b73d6689ee72a338c329124835587f092', 'dfsasdf');

INSERT INTO rounds (
    letter, category, played_at, words, score, level, user_id)
VALUES
('B','colors','2022-09-01 16:49:18','["BLUE","BLACK","BROWN"]',20,1,1),
('W','colors','2022-09-01 16:53:04','["WHITE","WHEAT","WISTERIA"]',30,1,1),
('J','countries','2022-09-01 16:53:59','["JAMAICA","JAPAN","JERSEY","JORDAN"]',80,2,1),
('H','animals','2022-09-01 16:54:50','["HAMSTER","HORSE","HARRIER","HERON","HOUND","HYENA"]',180,3,1),
('P','colors','2022-09-01 16:56:25','["PINK","PLATINUM","PUCE","PURPLE","PRUSSIAN-BLUE","PEACH","PEAR","PINE-GREEN","PLUM"]',360,4,1),
('U','countries','2022-09-01 17:01:04','["UGANDA","UKRAINE","URUGUAY","UNITED ARAB EMIRATES","U.S. OUTLYING ISLANDS","U.S. VIRGIN ISLANDS"]',240,4,2),
('P','animals','2022-09-01 17:02:40','["PANTHER","PARROT","PEACOCK","PELICAN","PENGUIN","PIG","PIKE","PIRANHA"]',240,3,2),
('I','colors','2022-09-01 17:03:14','["INDIGO","IVORY"]',20,1,2),
('M','colors','2022-09-01 17:20:25','["MAGENTA","MAGNOLIA","MUSTARD"]',30,1,3),
('H','countries','2022-09-01 17:21:32','["HAITI","HONDURAS","HONK KONG","HUNGARY","HONK KONG SAR CHINA","HEARD & MCDONALD ISLANDS"]',80,2,3),
('T','animals','2022-09-01 17:22:12','["TAMARIN","TIGER","TURKEY","TURTLE"]',80,2,3),
('R','animals','2022-09-01 17:22:43','["RABBIT","RACCOON","RAT"]',60,2,3),
('B','animals','2022-09-01 17:23:06','["BEAR","BEAGLE","BEE","BEATLE"]',60,2,3),
('B','colors','2022-09-01 17:46:31','["BLUE","BLACK","BROWN"]',15,1,2),
('H','colors','2022-09-01 17:47:42','["HAN-PURPLE","HARLEQUIN"]',20,1,2);
CREATE TABLE words (
    id integer primary key autoincrement,
    word varchar(64) NOT NULL,
    category varchar(8) NOT NULL,
    letter varchar(1) NOT NULL
);

