const userController = require("../controllers/user.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

module.exports = (app) => {
  app.post("/api/signup", userController.signUp);
  app.post("/api/signin", userController.signIn);
  app.get(
    "/api/protected",
    jwtMiddleware.authenticate,
    userController.protected
  );
  app.post("/api/logout", userController.logout);
};
