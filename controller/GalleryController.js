/** #======================================================#
 *  #    Program or program file : QuestController.js
 *  #    Description: Receives API call quest relevant data
 *  #    Author: Snorre & Micheal
 *  #    Date: 05.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as Services from "../services/GalleryService.js";

/**
 * @description return information about reward (painting)
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body
 * @return      async return with http response */
export async function getRewardInformation(req, res) {
    console.log("getPaintingInformation()");

    const {email} = req.signedCookies;
    const {rewardId} = req.params;

    if (!email) {
        // 401 Unauthorized
        return res.sendStatus(403);

    } else if (rewardId === "") {
        // Bad request
        return res.sendStatus(400);

    } else {
        let rewardInformation = await Services.getRewardInformation(email, rewardId);

        // 403 forbidden
        if (rewardInformation === 403) {
            res.sendStatus(403)

        } else if (rewardInformation === 500) {
            // 500 internal server error
            res.sendStatus(500);

        } else {
            res.send(rewardInformation);
        }

    }
}