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
    user_id       serial        not null
        constraint users_pk
            primary key,
    email    varchar(1000) not null,
    username varchar(100)  not null,
    password varchar(100)  not null,
    role     varchar(100)  not null
);

INSERT INTO test (firstname, lastname)
VALUES ('Ola', 'Nordmann'),
       ('Kari', 'Nordmann');

INSERT INTO users (email, username, password, role)
VALUES ('test@test.no', 'test', 'test', 'user');