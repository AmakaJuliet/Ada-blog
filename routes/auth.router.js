const authRouter = require("express").Router();
const { createUser, login} = require("../controllers/auth.controller");

authRouter.post("/signup", createUser);
authRouter.post("/login", login);

module.exports = authRouter;