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
 * @description unk nown
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body
 * @return      async return with http response */
export async function getAllQuests(req, res) {
    console.log("getAllQuests()");

    const {email} = req.signedCookies;
    const {quest} = req.body;

    if (!email) {
        // 403 forbidden
        return res.sendStatus(403);

    } else if (quest === "") {
        // Bad request
        return res.sendStatus(400);

    } else {
        let progress = await Services.getAllQuests(email);

        switch (progress) {
            case 500:
                return res.sendStatus(500); // 500 internal server error
        }

        return res.send(progress);
    }
}

/**
 * @description takes in data from client about new item_id and quest_id to update stats for user
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body
 * @return      async return with http response */
export async function updateQuest(req, res) {
    console.log("updateQuest()");

    const {email} = req.signedCookies;
    const {quest, item} = req.body;

    if (!email) {
        // 403 forbidden
        return res.sendStatus(403);

    } else if (quest === "" || item === "") {
        // Bad request
        return res.sendStatus(400);

    } else {
        let progress = await Services.updateQuestItem(email, item, quest);

        switch (progress) {
            case 500:
                return res.sendStatus(500); // 500 internal server error
        }

        return res.send(progress);
    }

}
