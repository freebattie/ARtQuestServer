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
 * @description takes in email and item from user to update db about progression
 * @param       email - string
 * @param       item - int id
 * @return      json object named result, check API doc for more information*/
export async function updateQuestItem(email, item) {
    console.log("updateQuestItem()");

    let result = {
        quest: item.quest_id,
        size: "",
        collected: [],
        reward: ""
    };

    try {
        await db.query(`
                    INSERT INTO questprogression (user_email, item_id)
                    VALUES ($1, $2);`
            , [email, item.item_id]);

    } catch (error) {
        console.log("SQL query 1 error", error);
        return null;
    }

    try {
        let queryResult = await db.query(`
                    SELECT itemcount
                    from quests
                    WHERE quest_id = $1;`
            , [item.quest_id]);

        if (queryResult.rowCount > 0) {
            console.log(queryResult);
            result.size = queryResult.rows[0]["itemcount"];
        }

    } catch (error) {
        console.log("SQL query 2 error", error);
    }

    try {
        let queryResult = await db.query(`
                    SELECT q.item_id
                    FROM questprogression
                             JOIN questitems q on q.item_id = questprogression.item_id
                    WHERE user_email = $1
                      AND quest_id = $2;`
            , [email, item.quest_id]);

        // Map from item object -> int item_id
        result.collected = queryResult.rows.map((item) => item.item_id);
    } catch (error) {
        console.log("SQL query 3 error", error)
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


