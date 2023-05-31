import * as db from "../db/index.js";

export async function userExists(username) {
  username = username.toLowerCase();

  let result = await db.query("SELECT * FROM Users WHERE username = $1;", [username]);
  console.debug(result);
  console.log("userExists() ->  count > " + result.rowCount);
  return result.rowCount > 0;
}

/// Returns false if an error occured during user creation and loggs error
export async function addUser(username, password, role) {
  username = username.toLowerCase();

  try {
    await db.query("INSERT INTO Users (username, password, role) VALUES ($1, $2, $3)", [username, password, role]);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}

