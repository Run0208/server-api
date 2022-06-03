import express from "express";
import homeController from "../controller/home.controller";
import verifyToken from "../middleware/auth.middleware";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.homePage);

  return app.use("/", router);
};
module.exports = initWebRoutes;
