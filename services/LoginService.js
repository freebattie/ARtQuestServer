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
 * @description Gets all userinfo by searching with email
 * @param     email - string
 * @return    db.row with user info*/
export async function requestUser(email) {
    console.log("requestUser()");

    try {
        return await db.query("Select * from users where email = $1", [
            email,
        ]);
    } catch (error) {
        console.log("requestUser error: ", error);
    }
}

/**
 * @description Normal login check
 * @param       email - string
 * @param       password - string
 * @return      db.row with one or zero user */
export async function loginUser(email, password) {
    console.log("loginUser()");

    try {
        return await db.query(
            "Select * from users where email = $1 AND password = $2",
            [email, password]
        );

    } catch (error) {
        console.log("requestUser error: ", error);
    }
}

