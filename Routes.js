/** #======================================================#
 *  #    Program or program file : Routes.js
 *  #    Description: For making API calls
 *  #    Author: Bjarte & Micheal
 *  #    Date: Unknown
 *  #    Version 1.0
 *  #======================================================#
 * */

const LOGINPATH = "/api/login";
const REGISTERPATH = "/api/register";
const QUESTAPI = "/api/quest";

import * as LoginController from "./controller/LoginController.js";
import * as RegisterController from "./controller/RegisterController.js";
import * as QuestController from "./controller/QuestController.js";

const routes = (app) => {
    // Login
    app.post(LOGINPATH, LoginController.login);

    // Registration
    app.post(REGISTERPATH, RegisterController.register);

    // Quests
    app.route(QUESTAPI)
        .get(
            LoginController.requestUser,
            QuestController.getAllQuests
        )
        .post(
            LoginController.requestUser,
            QuestController.updateQuest
        )
    ;

};

export default routes;
