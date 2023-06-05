DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS Users;

CREATE TABLE test
(
    Id        SMALLSERIAL,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    CONSTRAINT TestPK PRIMARY KEY (Id)
);

create table users
(
    email    varchar(1000)
        constraint users_pk
            primary key,
    password varchar(100),
    role     varchar(100)
);

INSERT INTO test (firstname, lastname)
VALUES ('Ola', 'Nordmann'),
       ('Kari', 'Nordmann');

INSERT INTO users (email, password, role)
VALUES ('test@test.no', 'test', 'user');