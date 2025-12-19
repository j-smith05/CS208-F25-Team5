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

INSERT INTO jeopardy_2(id, categories, questions, answers, points)
VALUES
    (26, 'The 90s', 'Which Spice Girl was known as Posh Spice?', 'Victoria Beckham', 100),
    (27, 'The 90s', 'The show "Friends" primarily takes place in which city?', 'New York City', 200),
    (28, 'The 90s', 'What virtual pet toy required you to feed and clean up after it?', 'Tamagotchi', 300),
    (29, 'The 90s', 'Which classic Nintendo 64 game features the character Link?', 'The Legend of Zelda: Ocarina of Time', 400),
    (30, 'The 90s', 'What grunge band was fronted by the late Kurt Cobain?', 'Nirvana', 500),
    (31, 'Mythology', 'Who is the Greek god of the sea?', 'Poseidon', 100),
    (32, 'Mythology', 'Which creature is a half-man, half-bull?', 'Minotaur', 200),
    (33, 'Mythology', 'Who lost his wings after flying too close to the sun?', 'Icarus', 300),
    (34, 'Mythology', 'What is the name of Thor''s hammer?', 'Mjolnir', 400),
    (35, 'Mythology', 'What animal guarded the Golden Fleece?', 'Dragon', 500),
    (36, 'Food & Drink', 'What is the main ingredient in guacamole?', 'Avocado', 100),
    (37, 'Food & Drink', 'This country is famous for inventing pizza.', 'Italy', 200),
    (38, 'Food & Drink', 'Which cheese is traditionally used to top French Onion Soup?', 'Gruyère', 300),
    (39, 'Food & Drink', 'What type of vegetable is a sweet potato?', 'Root vegetable', 400),
    (40, 'Food & Drink', 'What is the active ingredient in chili peppers that makes them spicy?', 'Capsaicin', 500),
    (41, 'Science', 'What is the chemical symbol for gold?', 'Au', 100),
    (42, 'Science', 'Which planet is known as the "Red Planet"?', 'Mars', 200),
    (43, 'Science', 'What is the smallest bone in the human body?', 'Stapes (Stirrup)', 300),
    (44, 'Science', 'The process by which plants convert light energy into chemical energy.', 'Photosynthesis', 400),
    (45, 'Science', 'What unit is used to measure electrical resistance?', 'Ohm', 500),
    (46, 'World Cities', 'What is the capital city of France?', 'Paris', 100),
    (47, 'World Cities', 'The Great Pyramid of Giza is located near which major city?', 'Cairo', 200),
    (48, 'World Cities', 'What city is home to the Sydney Opera House?', 'Sydney', 300),
    (49, 'World Cities', 'What is the most populous city in the world?', 'Tokyo', 400),
    (50, 'World Cities', 'In which European city would you find the Colosseum?', 'Rome', 500);

INSERT INTO jeopardy_3(id, categories, questions, answers, points)
VALUES
    (51, 'Movies & TV', 'In "The Wizard of Oz," what color is the brick road?', 'Yellow', 100),
    (52, 'Movies & TV', 'What is the name of the kingdom in "Frozen"?', 'Arendelle', 200),
    (53, 'Movies & TV', 'Who played the character of Jack Sparrow in "Pirates of the Caribbean"?', 'Johnny Depp', 300),
    (54, 'Movies & TV', 'Which TV show features a chemistry teacher named Walter White?', 'Breaking Bad', 400),
    (55, 'Movies & TV', 'How many "Star Wars" movies make up the "Skywalker Saga"?', '9', 500),
    (56, 'History', 'In what year did the Berlin Wall fall?', '1989', 100),
    (57, 'History', 'Who was the first female pilot to fly solo across the Atlantic?', 'Amelia Earhart', 200),
    (58, 'History', 'What was the name of the series of programs launched by FDR to end the Depression?', 'The New Deal', 300),
    (59, 'History', 'Which country gifted the Statue of Liberty to the United States?', 'France', 400),
    (60, 'History', 'Who was the primary author of the Declaration of Independence?', 'Thomas Jefferson', 500),
    (61, 'Video Games', 'What is the name of the main protagonist in "The Legend of Zelda"?', 'Link', 100),
    (62, 'Video Games', 'In "Pac-Man," what is the name of the red ghost?', 'Blinky', 200),
    (63, 'Video Games', 'Which game features "Creepers" and "Endermen"?', 'Minecraft', 300),
    (64, 'Video Games', 'What is the best-selling gaming console of all time?', 'PlayStation 2', 400),
    (65, 'Video Games', 'In "Halo," what is the name of the artificial intelligence that accompanies Master Chief?', 'Cortana', 500),
    (66, 'Sports', 'How many players are on a baseball team on the field at one time?', '9', 100),
    (67, 'Sports', 'In what sport would you use a "sand wedge"?', 'Golf', 200),
    (68, 'Sports', 'Which city hosts the Wimbledon tennis tournament?', 'London', 300),
    (69, 'Sports', 'What is the distance of a full marathon in miles?', '26.2', 400),
    (70, 'Sports', 'Which NFL team has the most Super Bowl wins? (Tie between two teams)', 'Steelers or Patriots', 500),
    (71, 'Music', 'What is the name of the lead singer of U2?', 'Bono', 100),
    (72, 'Music', 'How many strings are on a violin?', '4', 200),
    (73, 'Music', 'Which pop star is known as the "Material Girl"?', 'Madonna', 300),
    (74, 'Music', 'What was the name of the Spice Girls first hit single?', 'Wannabe', 400),
    (75, 'Music', 'In what year did the Woodstock Festival take place?', '1969', 500);

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

INSERT INTO animals(id, questions, answers, points) --Added for #31
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy
WHERE
        categories = 'Animals';

INSERT INTO random(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy
WHERE
        categories = 'Random';

INSERT INTO the90s(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'The 90s';

INSERT INTO mythology(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'Mythology';

INSERT INTO foodAndDrink(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'Food & Drink';

INSERT INTO science(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'Science';

INSERT INTO worldCities(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'World Cities';

INSERT INTO moviesAndTv(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'Movies & TV'

INSERT INTO videoGames(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_2
WHERE
        categories = 'Video Games'

INSERT INTO history(id, questions, answers, points)
SELECT
    id,
    questions,
    answers,
    points
FROM
    jeopardy_3
WHERE
        categories = 'History'

INSERT INTO team_answers (team_id, question_id, is_correct)
VALUES (1, 7, 1);