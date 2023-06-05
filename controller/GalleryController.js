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
 * @description
 * @param
 * @return */
export async function getRewardInformation(req, res){
    console.log("getPaintingInformation()");

    const {email} = req.signedCookies;
    const {rewardId} = req.params;

    return res.sendStatus(501);
}