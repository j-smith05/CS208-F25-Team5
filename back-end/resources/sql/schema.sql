-- Execute all SQL statements, in sequential order, from the top of this file
-- to create the tables or to "reset" the database to the expected structure



DROP TABLE IF EXISTS jeopardy;
DROP TABLE IF EXISTS jeopardy_2;
DROP TABLE IF EXISTS disney;
DROP TABLE IF EXISTS literature;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS animals;
DROP TABLE IF EXISTS team_answers;
DROP VIEW IF EXISTS  all_questions;
DROP VIEW IF Exists  team_scoreboard;

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

CREATE TABLE jeopardy_2
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

CREATE TABLE animals --Added for #31
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE random
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE the90s
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE mythology
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE foodAndDrink
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE science
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE worldCities
(
    id         INTEGER,
    questions  VARCHAR(100),
    answers    VARCHAR(100),
    points     INTEGER

);

CREATE TABLE team_answers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id     INTEGER,
    question_id INTEGER,
    is_correct  INTEGER,   -- 1 = correct, 0 = incorrect
FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE VIEW all_questions AS
SELECT id, categories, questions, answers, points
FROM jeopardy
UNION ALL
SELECT id, categories, questions, answers, points
FROM jeopardy_2;

CREATE VIEW team_question_details AS
SELECT
    team.id           AS team_id,
    team.teamName,
    team.firstName,
    team.lastName,
    all_questions.id           AS question_id,
    all_questions.categories,
    all_questions.questions,
    all_questions.answers,
    all_questions.points,
    team_answers.is_correct
FROM team
JOIN team_answers   ON team.id = team_answers.team_id
JOIN all_questions           ON team_answers.question_id = all_questions.id;

CREATE VIEW team_scoreboard AS
SELECT
    team.id AS team_id,
    team.teamName,
    team.firstName,
    team.lastName,
    COALESCE(SUM(
    CASE
    WHEN team_answers.is_correct = 1 THEN q.points
    ELSE 0
    END
    ), 0) AS totalScore
FROM team
    LEFT JOIN team_answers
    ON team.id = team_answers.team_id
    LEFT JOIN all_questions q
    ON team_answers.question_id = q.id
GROUP BY
    team.id,
    team.teamName,
    team.firstName,
    team.lastName
ORDER BY totalScore DESC;