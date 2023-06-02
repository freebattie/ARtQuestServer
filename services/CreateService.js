import * as db from "../db/index.js";

export async function userExists(email) {
  email = email.toLowerCase();

  let result = await db.query("SELECT * FROM Users WHERE email = $1;", [email]);
  console.debug(result);
  console.log("userExists() ->  count > " + result.rowCount);
  return result.rowCount > 0;
}

/// Returns false if an error occured during user creation and loggs error
export async function addUser(email, password, role) {
  email = email.toLowerCase();

  try {
    await db.query(
      "INSERT INTO Users (email, password, role) VALUES ($1, $2, $3)",
      [email, password, role]
    );
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}
