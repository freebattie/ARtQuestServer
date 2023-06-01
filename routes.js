const TEST = "/api/test";
const LOGINPATH = "/api/login";
const REGISTERPATH = "/api/register";

import * as TestController from "./controller/TestController.js";
import * as LoginController from "./controller/LoginController.js";
import * as RegisterController from "./controller/RegisterController.js";

const routes = (app) => {
  //LOGIN ROUTES
  app.post(LOGINPATH, LoginController.login);
  app.post(REGISTERPATH, RegisterController.register);

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
