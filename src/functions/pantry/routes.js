import express from "express";
import getItems from "./getItems.js";
import updateQuantity from "./updateQuantity.js";
import deleteItem from "./deleteItem.js";
import addItem from "./addItem.js";
import getById from "./getById.js";
import update from "./update.js";
import insert from "./insert.js";
import remove from "./remove.js";

const routes = express.Router();

routes.get("/add-item/:barcode/:id", addItem);
routes.get("/items/:userId", getItems);
routes.put("/item-quantity", updateQuantity);
routes.delete("/delete-item/:pantryId/:barcode", deleteItem);
routes.get("/:id", getById);
routes.put("/:id", update);
routes.post("/", insert);
routes.delete("/:id", remove);

export default routes;
