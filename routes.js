const TEST = "/api/test";
const LOGINPATH = "/api/login";

import * as TestController from "./controller/testController.js";
import * as LoginController from "./controller/loginController.js";

const routes = (app) => {
  //LOGIN ROUTES
  app.post(LOGINPATH, LoginController.login);
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
