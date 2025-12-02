-- Execute all SQL statements, in sequential order, from the top of this file
-- to create the tables or to "reset" the database to the expected structure

--TODO Fix of Linter Report--

DROP TABLE IF EXISTS jeopardy;
DROP TABLE IF EXISTS disney;

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