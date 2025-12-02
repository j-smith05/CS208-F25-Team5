-- Execute all SQL statements, in sequential order, from the top of this file
-- to create the tables or to "reset" the database to the expected structure



DROP TABLE IF EXISTS jeopardy;
DROP TABLE IF EXISTS disney;
DROP TABLE IF EXISTS literature;
DROP TABLE IF EXISTS team;

CREATE TABLE team
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        firstName VARCHAR(20),
        lastName VARCHAR(20),
        teamName VARCHAR(20)
);

CREATE TABLE jeopardy
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    categories VARCHAR(20),
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE disney
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

    );

CREATE TABLE literature
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE justforfun
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);