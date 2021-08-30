import express from "express";
import get from "./get.js";
import getById from "./getById.js";
import update from "./update.js";
import insert from "./insert.js";
import remove from "./remove.js";

const routes = express.Router();

routes.get("/", get);
routes.get("/:id", getById);
routes.put("/:id", update);
routes.post("/", insert);
routes.delete("/:id", remove);

export default routes;
