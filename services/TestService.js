import * as db from "../db/index.js";
export default class TestService {
  static getUserFromTestTable = async (id) => {
    try {
      return await db.query("Select * from test where id = $1", [id]);
    } catch (error) {
      console.log("getUserFromTestTable error: ", error);
    }
  };
}
