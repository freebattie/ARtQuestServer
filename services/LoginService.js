/** #======================================================#
 *  #    Program or program file : LoginService.js
 *  #    Description: Connection point between Controller and DB
 *  #    Author: Snorre & Micheal
 *  #    Date: Unknown
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as db from "../db/index.js";

/**
 * @description Gets all userinfo by searching with username
 * @param     username - string
 * @return    db.row with user info*/
export async function requestUser(username) {
    console.log("requestUser()");

    try {
        return await db.query("Select * from users where email = $1", [
            username,
        ]);
    } catch (error) {
        console.log("requestUser error: ", error);
    }
}

/**
 * @description Normal login check
 * @param       username - string
 * @param       password - string
 * @return      db.row with one or zero user */
export async function loginUser(username, password) {
    console.log("loginUser()");

    try {
        return await db.query(
            "Select * from users where email = $1 AND password = $2",
            [username, password]
        );

    } catch (error) {
        console.log("requestUser error: ", error);
    }
}

