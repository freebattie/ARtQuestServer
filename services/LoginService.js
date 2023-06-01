import * as db from "../db/index.js";
import Hash from "../controller/Hash.js";

export default class LoginService {

   /* Gets all userinfo by searching with username
   * PARA1     username
   * return    db.row with user info*/
   static requestUser = async (username) => {
      try {
         return await db.query("Select * from Users where email = $1", [
            username,
         ]);
      } catch (error) {
         console.log("requestUser error: ", error);
      }
   };

   /* Check if user */
   static loginUser = async (username, password) => {
      try {
         var result = await db.query(
            "Select * from Users where email = $1 AND password = $2",
            [username, password]
         );

         console.log(result);

         return result;

      } catch (error) {
         console.log("requestUser error: ", error);
      }
   };
}
