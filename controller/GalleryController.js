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
 * @description returns information about single reward (painting)
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body
 * @return      async return with http response */
export async function getSingleRewardInformation(req, res) {
    console.log("getSingleRewardInformation()");

    const {email} = req.signedCookies;
    const {rewardId} = req.params;

    if (!email) {
        // 403 forbidden
        return res.sendStatus(403);

    } else if (rewardId === "") {
        // Bad request
        return res.sendStatus(400);

    } else {
        try {
            let rewardInformation = await Services.getRewardInformation(email, rewardId);

            // 403 forbidden
            if (rewardInformation === 403) {
                return res.sendStatus(403)

            } else {
                return res.send(rewardInformation);
            }

        } catch (error) {
            console.log("SQL error: ", error);
            return res.sendStatus(500);
        }
    }
}


/**
 * @description returns information about every reward user have access to (paintings)
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body
 * @return      async return with http response */
export async function getAllRewardInformation(req, res) {
    console.log("getAllRewardInformation()");

    const {email} = req.signedCookies;

    if (!email) {
        // 403 forbidden
        return res.sendStatus(403);

    } else {
        try {
            let rewardInformation = await Services.getAllRewardInformation(email);
            return res.send(rewardInformation);

        } catch (error) {
            console.log("SQL error", error);
            return res.sendStatus(500);
        }
    }
}