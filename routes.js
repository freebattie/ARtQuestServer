const TEST = "/api/test";
const LOGINPATH = "/api/login";
const REGISTERPATH = "/api/register";
const QUESTAPI = "/api/quest";

import * as TestController from "./controller/TestController.js";
import * as LoginController from "./controller/LoginController.js";
import * as RegisterController from "./controller/RegisterController.js";
import * as QuestController from "./controller/QuestController.js";

const routes = (app) => {
  //LOGIN ROUTES
  app.post(LOGINPATH, LoginController.login);
  app.post(REGISTERPATH, RegisterController.register);

  // Quest routes
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


  //TEST ROUTES
  // rute som krever at bruker er logget inn
  app.get(
    TEST,
    LoginController.requestUser,
    TestController.getAllUsersFromTestTable
  );

  //rute som ikke krever at bruker er logget inn
  app.get(TEST + "/:id", TestController.getUserFromTestTable);
};

export default routes;
