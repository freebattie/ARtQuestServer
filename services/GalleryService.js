/** #======================================================#
 *  #    Program or program file : GalleryService.js
 *  #    Description: Connection point between Controller and DB
 *  #    Author: Snorre & Michael
 *  #    Date: 05.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as db from "../db/index.js";

export async function getRewardInformation(email, rewardId) {
    console.log("getRewardInformation");

    let result = {
        filename: "",
        picturetitle: "",
        picturedescription: ""
    }

    try {
        let queryResult = await db.query(`
            select filename, picturetitle, picturedescription
            from questrewards
                     join usergallery u on questrewards.reward_id = u.reward_id
            where user_email = $1
              and u.reward_id = $2;
        `, [email, rewardId]);

        // 403 forbidden
        if (queryResult < 1) {
            return 403;
        }

        result.filename = queryResult.rows[0].filename;
        result.picturetitle = queryResult.rows[0].picturetitle;
        result.picturedescription = queryResult.rows[0].picturedescription;
        return result;

    } catch (error) {
        console.log("SQL error: ", error);
        return 500;
    }
}