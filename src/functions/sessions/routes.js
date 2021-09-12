import express from "express";
import login from "./login.js";

const routes = express.Router();

routes.post("/login", login);

export default routes;
