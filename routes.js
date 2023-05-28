const TEST = "/api/test";
import * as TestController from "./controller/testController.js";
const routes = (app) => {
  app.get(TEST, TestController.getUserFromTestTable);
};

export default routes;
