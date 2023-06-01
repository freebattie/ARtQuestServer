import * as db from "../db/index.js";

export async function updateQuestItem(user, item) {
   let result = {
      quest: undefined,
      size: undefined,
      collected: [],
      reward: "We don't have any 😠"
   };
   {
      let { queryResult } = db.query(`
INSERT INTO questprogression (user_email, item_id)
VALUES ($1, $2)`
         , user, item.item_id);

      console.log("Alter result:");
      console.log(queryResult);
   }

   {
      let { queryResult } = db.query("SELECT itemcount from quests WHERE quest_id = $1", item.quest_id);
      if (queryResult.rowCount > 0) result.size = queryResult.rows[0];
   }

   {
      let { queryResult } = db.query(`
SELECT item_id 
FROM questprogression
JOIN questitems i on i.item_id == questprogression.item_id
WHERE user_email = $1 AND quest_id=$2`
         , user, item.quest_id);

      for (rows in queryResult) {
         result.collected.push(item_id);
      }
   }

   return result;
}

export async function getQuests(user) {
   let result = [];
   // TODO: Not this sprint
   //
   // try {
   //    { // Get all quests
   //       let { queryResult } = await db.query("QUERY", user);
   //
   //       for (row in queryResult.rows) {
   //          result.push({
   //             quest: row[0], // Actual Quest
   //             questCount: row[1], // Total items for quest
   //             collected: []
   //          })
   //       }
   //    }
   //
   //    { // Fill in found quest items for each quests
   //       let { queryResult } = await db.query("QUERY", user);
   //
   //       for (row in queryResult.rows) {
   //          result.find((q) => q.quest == row[0]).push(row[1]);
   //       }
   //    }
   //
   //    { // Get reward path for users rewards
   //       let { queryResult } = await db.query("QUERY", user)
   //    }
   // }
   // catch (sql_err) {
   //    console.err(sql_err);
   //    result = [];
   // }
   // finally {
   //    return result;
   // }
   //
   // -------------------- SQL QUERY Sketch --------------------------
   // SELECT quest_id, itemcount
   // FROM quests;
   //
   // SELECT questitems.item_id
   // FROM questitems
   // inner join questprogression q on questitems.item_id = q.item_id
   // WHERE user_email = 'test@test.no'
   // ORDER BY quest_id ASC;
   //
   // SELECT picturename
   // FROM usergallery
   // inner join questrewards q on q.reward_id = usergallery.reward_id
   // WHERE user_email = 'test@test.no';
}


