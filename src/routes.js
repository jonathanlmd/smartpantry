import express from "express";
import pantry from "./functions/pantry/routes.js";
import user from "./functions/user/routes.js";
const routes = express.Router();

routes.use("/user", user);
routes.use("/pantry", pantry);

export default routes;
