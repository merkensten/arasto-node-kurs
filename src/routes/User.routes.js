import UserController from "../controllers/User.controller.js";

const routes = (app) => {
  app.post("/user", UserController.createUser);
  app.get("/user", UserController.getAllUsers);
  app.get("/user/:userId", UserController.getUserWithId);
};

export default { routes };
