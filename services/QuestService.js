/** #======================================================#
 *  #    Program or program file : QuestController.js
 *  #    Description: Connection point between Controller and DB
 *  #    Author: Snorre & Micheal
 *  #    Date: 02.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as db from "../db/index.js";
import {sendPromoMail} from "../lib/mail.js";

/**
 * @description takes in email and itemId from user to update db about progression
 * @param       email - string
 * @param       itemId - int id
 * @param       questId - int id
 * @return      json object named result, check API doc for more information*/
export async function updateQuestItem(email, itemId, questId) {
    console.log("updateQuestItem()");

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

    // Check if values exist, if yes add it
    console.log("SQL 1");
    {
        await db.query(`
            insert into questprogression (user_email, item_id)
            select $1, $2
            where not exists(select *
                             from questprogression
                             where user_email = $3
                               and item_id = $4);
        `, [email, itemId, email, itemId]);
    }

    // get size from collection that itemId is connected to
    console.log("SQL 2");
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
    console.log("SQL 3")
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
    console.log("SQL 4");
    {
        let queryResult = await db.query(`
            select count(q.item_id) as progression, q3.itemcount, q3.questreward_id
            from questprogression as q
                     join questitems q2 on q2.item_id = q.item_id
                     join quests q3 on q3.quest_id = q2.quest_id
            where user_email = $1
              AND q2.quest_id = $2
            group by q3.itemcount, q3.questreward_id;
        `, [email, questId]);

        let progression = queryResult.rows[0].progression;
        let itemCount = queryResult.rows[0].itemcount;
        let questRewardId = queryResult.rows[0].questreward_id;

        // If user progression is complete, add picture to user gallery
        // == is done on purposes, don't change!
        if (progression == itemCount) {
            console.log("SQL 5");
            await db.query(`
                insert into usergallery (user_email, reward_id)
                select $1, $2
                where not exists(select *
                                 from usergallery
                                 where user_email = $3
                                   and reward_id = $4);
            `, [email, questRewardId, email, questRewardId]);

            console.log("SQL 6");
            let queryResult = await db.query(`
                select filename, picturetitle, picturedescription
                from questrewards
                where reward_id = $1;
            `, [questRewardId]);

            result.reward.filename = queryResult.rows[0].filename;
            result.reward.picturetitle = queryResult.rows[0].picturetitle;
            result.reward.picturedescription = queryResult.rows[0].picturedescription;
        }
    }

    // sends promo epost to user when finised collecting all items
    // this is here only because showing of feature when going through a demo
    if (result.collected.length === result.size) {
        sendPromoMail(email);
    }

    return result;
}


/**
 * @description return progress of all quests to client
 * @param       email - string
 * @return      array of quest object with progression */
export async function getAllQuests(email) {
    console.log("getAllQuests()");
    let results = [];

    // Get all quests
    console.log("SQL 1");
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
    console.log("SQL 2");
    {
        let queryResult = await db.query(`
            SELECT q2.quest_id, q.item_id
            FROM questprogression as q
                     inner join questitems q2 on q2.item_id = q.item_id
            WHERE user_email = $1
            order by quest_id;
        `, [email]);

        if (queryResult.rowCount > 0) {
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
    }

    return results;
}




