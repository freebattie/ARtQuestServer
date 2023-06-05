INSERT INTO questrewards (picturename, picturedescription)
VALUES ('Scream', 'Person geeking on a bride!'),
       ('The Girls on the Bridge', 'The are standing on a bridge');

INSERT INTO usergallery (user_email, reward_id)
VALUES ('test@test.no', 1);

INSERT INTO quests (galleryname, gallerydescription, itemcount)
VALUES ('Exhibition: Munch Infinite', 'Where the holes are ;-)', 2),
       ('Exhibition: Munch Monumental', 'Where the big moments happen (-;', 2);

INSERT INTO questitems (quest_id)
VALUES (1), (1), (2), (2);

INSERT INTO questprogression (user_email, item_id)
VALUES ('test@test.no', 1),
       ('test@test.no', 2),
       ('test@test.no', 3);