/** #======================================================#
 *  #    Program or program file : QuestController.js
 *  #    Description: Receives API call quest relevant data
 *  #    Author: Snorre & Micheal
 *  #    Date: 01.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as Services from "../services/QuestService.js";

/**
 * @description unknown
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body */
export async function getAllQuests(req, res) {
    console.log("getAllQuests()");
    // TODO 503 is just tmp
    return res.sendStatus(503);
}

/**
 * @description takes in data from client about new item_id and quest_id to update stats for user
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body */
export async function updateQuest(req, res) {
    console.log("updateQuest()");

    const {email} = req.signedCookies;
    const {quest, item} = req.body;

    if (email) {
        // 401 Unauthorized
        return res.sendStatus(403);

    } else if (quest === "" || item === "") {
        // Bad request
        return res.sendStatus(400);

    } else {
        try {
            let progress = await Services.updateQuestItem(email, {quest_id: quest, item_id: item});

            if (progress !== null) {
                return res.send(progress);
            } else {
                // 409 Conflict
                return res.sendStatus(409);
            }

        } catch (error) {
            // 500 Internal server error
            return res.sendStatus(500);
        }
    }

}
