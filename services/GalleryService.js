/** #======================================================#
 *  #    Program or program file : GalleryService.js
 *  #    Description: Connection point between Controller and DB
 *  #    Author: Snorre & Michael
 *  #    Date: 05.06.2023
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as db from "../db/index.js";

/**
 * @description get reward information based on user email and reward ID
 * @param       email - string
 * @param       rewardId - int
 * @return      json object with filname, picturetitle and picutre description*/
export async function getRewardInformation(email, rewardId) {
    console.log("getRewardInformation");

    let result = {
        filename: "",
        picturetitle: "",
        picturedescription: ""
    }

    {
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
    }
}


/**
 * @description get all information about all the reward user have
 * @param       email - string
 * @return      json object what has a array of object describing the rewards*/
export async function  getAllRewardInformation(email){
    console.log("getAllRewardInformation()");

    let result = [];
    
    {
        let queryResult = await db.query(`
            select filename, picturetitle, picturedescription
            from usergallery as g
                     inner join questrewards q on q.reward_id = g.reward_id
            where user_email = $1;
        `, [email]);
        
        for (let row of queryResult.rows) {
            let picture = {
                filename: row.filename,
                picturetitle: row.picturetitle,
                picturedescription: row.picturedescription
            };

            result.push(picture);
        }

        return result;
    }

}