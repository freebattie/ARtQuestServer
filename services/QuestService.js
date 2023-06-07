/** #======================================================#
 *  #    Program or program file : QuestController.js
 *  #    Description: Connection point between Controller and DB
 *  #    Author: Snorre & Micheal
 *  #    Date: 02.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as db from "../db/index.js";

/**
 * @description takes in email and itemId from user to update db about progression
 * @param       email - string
 * @param       itemId - int id
 * @param       questId - int id
 * @return      json object named result, check API doc for more information*/
export async function updateQuestItem(email, itemId, questId) {
    console.log("updateQuestItem()");

    let isRegistered = false;
    let result = {
        quest: questId,
        size: "",
        collected: [],
        reward: {
            filename: "",
            picturedescription: "",
            picturetitle: ""
        }
    };

    // Check if values exist beforehand
    console.log("SQL 1");
    {
        let queryResult = await db.query(`
            select *
            from questprogression
            where user_email = $1
              and item_id = $2;
        `, [email, itemId]);

        if (queryResult.rowCount > 0) {
            isRegistered = true;
        }
    }

    // Add item to collection
    if (!isRegistered) {
        console.log("SQL 2");

        await db.query(`
            insert into questprogression (user_email, item_id)
            values ($1, $2);
        `, [email, itemId]);
    }


    // get size from collection that itemId is connected to
    console.log("SQL 3");
    {
        let queryResult = await db.query(`
            SELECT itemcount
            from quests
            WHERE quest_id = $1;
        `, [questId]);

        if (queryResult.rowCount > 0) {
            result.size = queryResult.rows[0]["itemcount"];
        }
    }

// get array of itemId from quest that user have collected
    console.log("SQL 4")
    {
        let queryResult = await db.query(`
            SELECT q.item_id
            FROM questprogression
                     JOIN questitems q on q.item_id = questprogression.item_id
            WHERE user_email = $1
              AND quest_id = $2;
        `, [email, questId]);

        // Map from itemId object -> int item_id
        result.collected = queryResult.rows.map((item) => item.item_id);
    }

// give reward to player
    console.log("SQL 5");
    {
        let queryResult = await db.query(`
            
        `);
    }


    return result;
}


/**
 * @description return progress of all quests to client
 * @param       email - string
 * @return      array of quest object with progression */
export async function getAllQuests(email) {
    let results = [];

    // Get all quests
    {
        let queryResult = await db.query(`
            select quest_id, galleryname, itemcount
            from quests;
        `);

        for (let row of queryResult.rows) {
            results.push({
                quest: row.quest_id, // Actual Quest
                galleryname: row.galleryname,
                size: row.itemcount, // Total items for quest
                collected: [],
            })
        }
    }

    // Fill in found quest items for each quests
    {
        let queryResult = await db.query(`
            SELECT q2.quest_id, q.item_id
            FROM questprogression as q
                     inner join questitems q2 on q2.item_id = q.item_id
            WHERE user_email = $1
            order by quest_id;
        `, [email]);

        let currentQuest = queryResult.rows[0].quest_id;
        let tmpArray = [];
        let resultsIndex = 0;

        for (let row of queryResult.rows) {
            if (currentQuest !== row.quest_id) {
                currentQuest = row.quest_id;
                results[resultsIndex].collected = tmpArray;
                resultsIndex++;
                tmpArray = [];
            }

            tmpArray.push(row.item_id);
            console.log(results);
        }
        results[resultsIndex].collected = tmpArray;
    }

    return results;
}




