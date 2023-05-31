import * as db from "../db/index.js";

export async function userExists(username) {
   let result = await db.query("SELECT username from users where username = $1", [username]);
   return result.len > 0;
}

/// Returns false if an error occured during user creation and loggs error
export async function addUser(username, password) {
   // TODO: Implementation requires the db tables to be setup
   console.error("CreateService.addUser is NOT implemented!");
   return false;
}

