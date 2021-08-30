import express from "express";
import getById from "./getById.js";
import update from "./update.js";
import insert from "./insert.js";
import remove from "./remove.js";

const routes = express.Router();

routes.get("/:userId", getById);
routes.put("/:userId", update);
routes.post("/", insert);
routes.delete("/:userId", remove);

export default routes;
