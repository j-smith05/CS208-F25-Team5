-- Execute all SQL INSERT statements, in sequential order, from the top of this file
-- to populate the tables with sample data


-- TODO: Insert some sample rows to populate the tables
INSERT INTO jeopardy(id, categories, questions, answers, points)
VALUES
    (1, 'Disney', 'What movie is Hakuna Matata from?', 'The Lion King', 100),
    (2, 'Disney', 'What is the name of the dragon that helps Mulan?', 'Mushu', 200),
    (3, 'Disney', 'Who helps Marlin look for Nemo?', 'Dory', 300),
    (4, 'Disney', 'What is the name of Rapunzels pet chameleon in Tangled?', 'Pascal', 400),
    (5, 'Disney', 'We dont talk about_____?', 'Bruno', 500),
    (6, 'Literature', 'What is the name of Harry Potters pet?', 'Hedwig', 100),
    (7, 'Literature', 'What district is Katniss Everdeen from?', 'District 12', 200),
    (8, 'Literature', 'What house is Harry Potter in?', 'Gryffindor', 300),
    (9, 'Literature', 'Who is the main character from The Lord of the Rings?', 'Frodo', 400),
    (10, 'Literature', 'Who drives the Magic School Bus?', 'Ms. Frizzle', 500),
    (11, 'Just for fun', 'How many days in a year?', '365', 100),
    (12, 'Just for fun', 'Who was the American President during the civil war?', 'Abraham Lincoln', 200),
    (13, 'Just for fun', 'What part of the plant conducts photosynthesis?', 'Leaf', 300),
    (14, 'Just for fun', 'What year was the iPhone released?', '2007', 400),
    (15, 'Just for fun', 'Sport known as king of sports?', 'Soccer', 500),
    (16, 'Animals', 'What is a group of lions called?', 'A Pride', 100),
    (17, 'Animals', 'How many wings to dragonflies have?', '4', 200),
    (18, 'Animals', 'What do you call a female deer?', 'A doe', 300),
    (19, 'Animals', 'What animal can carry up to 5000 times its body weight?', 'An ant', 400),
    (20, 'Animals', 'What is the slowest animal in the world?', 'Sloth', 500),
    (21, 'Random', 'What city is the capital of the world?', 'Hollywood', 100),
    (22, 'Random', 'What city is the capital of California', 'Sacramento', 200),
    (23, 'Random', 'What holiday is celebrated on the second Sunday in May in the US?', 'Mothers day', 300),
    (24, 'Random', 'What is the planet with the most moons?', 'Saturn', 400),
    (25, 'Random', 'What color are the smurfs?', 'Blue', 500);


INSERT INTO disney(id, questions, answers, points)
    SELECT
        id,
        questions,
        answers,
        points
    FROM
        jeopardy
    WHERE
        categories = 'Disney';

INSERT INTO literature(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy
WHERE
        categories = 'Literature';

INSERT INTO justforfun(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy
WHERE
        categories = 'Just for fun';