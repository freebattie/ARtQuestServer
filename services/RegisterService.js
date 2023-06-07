/** #======================================================#
 *  #    Program or program file : RegisterService.js
 *  #    Description: Connection point between Controller and DB
 *  #    Author: Bjarte
 *  #    Date: Unknown
 *  #    Version 1.0
 *  #======================================================#
 * */

import * as db from "../db/index.js";


/**
 * @description Checks database if user exist using users email to search
 * @param       email - string with users email
 * @return      db result */
export async function userExists(email) {
    email = email.toLowerCase();

    let result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    console.debug(result);
    console.log("userExists() ->  count > " + result.rowCount);
    return result.rowCount > 0;
}

/**
 * @description Takes inn information from user and makes a new one.
 * @param       email - string with user email
 * @param       password - string hash of original password
 * @param       role - string description of rights/role user have
 * @return      true if complete or false if failed*/
export async function addUser(email, password, role) {
    console.log("addUser()");
    email = email.toLowerCase();

    {
        await db.query(
            "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
            [email, password, role]
        );

    return true;
}
}
