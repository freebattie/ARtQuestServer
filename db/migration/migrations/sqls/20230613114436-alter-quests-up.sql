/* Replace with your SQL commands */

UPDATE quests
   SET gallerydescription = 'The most iconic Munch artwork',
       itemcount = 2
WHERE quest_id = 1;

UPDATE quests
   SET 
      galleryname = 'Exhibition: Beating Heart',
      gallerydescription = 'A collection of artworks by Marianne Bratteli',
       itemcount = 2
   WHERE quest_id = 2;

UPDATE questrewards
   SET 
      filename = 'krigsbarn',
      picturedescription = 'A very thougt provoking artwork',
      picturetitle = 'Krigsbarn'
   WHERE reward_id = 2;

