/* Replace with your SQL commands */
UPDATE quests
SET
   galleryname = 'Exhibition: Marianne Bratteli Beating Heart',
   gallerydescription = 'Marianne Bratteli uses the canvas to depict the fundamentals of human life: origins, family ties and childhood memories. In the exhibition Beating Heart, viewers can discover the ways in which the post-WWII era have left their traces in Bratteli’s art. '
WHERE quest_id = 2;

UPDATE questrewards
SET
   filename = 'krigsbarn',
   picturetitle = 'Krigsbarn',
   picturedescription = 'Krigsbarn (War Child) by Marianne Bratteli, 2018. Oil on canvas, 100 x 120 cm. Photo: Marianne Bratteli.'
WHERE reward_id = 2;

UPDATE questrewards
SET filename = 'scream'
WHERE reward_id = 1;
