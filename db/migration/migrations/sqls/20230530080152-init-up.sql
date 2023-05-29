DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS Users;

CREATE TABLE test
(
    Id        SMALLSERIAL,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    CONSTRAINT TestPK PRIMARY KEY (Id)
);

CREATE TABLE users
(
    Id       SMALLSERIAL,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(255) NOT NULL,
    CONSTRAINT UsersPK PRIMARY KEY (Id)
);

INSERT INTO test (firstname, lastname)
VALUES ('Ola', 'Nordmann'),
       ('Kari', 'Nordmann');