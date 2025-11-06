-- Execute all SQL statements, in sequential order, from the top of this file
-- to create the tables or to "reset" the database to the expected structure


-- TODO: add your tables structure

DROP TABLE IF EXISTS samples;

CREATE TABLE jeopardy
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    categories         VARCHAR(20),
    questions VARCHAR(100),
    answers VARCHAR(100),
    points int

);
