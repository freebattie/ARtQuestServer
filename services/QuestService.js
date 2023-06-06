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
        reward: ""
    };

    // Check if values exist beforehand
    try {
        let queryResult = await db.query(`
            select *
            from questprogression
            where user_email = $1
              and item_id = $2;
        `, [email, itemId]);

        if (queryResult.rowCount > 0) {
            isRegistered = true;
        }

    } catch (error) {
        console.log("SQL 1 error: ", error);
        return 500;
    }

    // Add item to collection
    if (!isRegistered) {
        try {
            await db.query(`
                insert into questprogression (user_email, item_id)
                values ($1, $2);
            `, [email, itemId]);

        } catch (error) {
            console.log("SQL 2 error: ", error);
            return 500;
        }
    }

    // get size from collection that itemId is connected to
    try {
        let queryResult = await db.query(`
            SELECT itemcount
            from quests
            WHERE quest_id = $1;
        `, [questId]);

        if (queryResult.rowCount > 0) {
            result.size = queryResult.rows[0]["itemcount"];
        }

    } catch (error) {
        console.log("SQL 3 error", error);
        return 500;
    }

    // get array of itemId from quest that user have collected
    try {
        let queryResult = await db.query(`
            SELECT q.item_id
            FROM questprogression
                     JOIN questitems q on q.item_id = questprogression.item_id
            WHERE user_email = $1
              AND quest_id = $2;
        `, [email, questId]);

        // Map from itemId object -> int item_id
        result.collected = queryResult.rows.map((item) => item.item_id);

    } catch (error) {
        console.log("SQL 4 error", error)
        return 500;
    }

    return result;
}

// TODO: Not this sprint
export async function getQuests(user) {
    // let result = [];
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


