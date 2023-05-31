import * as db from "../db/index.js";
export default class LoginService {
  static requestUser = async (userName) => {
    try {
      return await db.query("Select * from Users where userName = $1", [
        userName,
      ]);
    } catch (error) {
      console.log("requestUser error: ", error);
    }
  };

  static loginUser = async (userName, password) => {
    try {
      return await db.query(
        "Select * from Users where username = $1 AND password = $2",
        [userName, password]
      );
    } catch (error) {
      console.log("requestUser error: ", error);
    }
  };
}
