import { Pantry, Product, User } from "../../db/models.js";
import axios from "axios";
import AppError from "../../errors/AppError.js";

async function deleteItem(request, response) {
  const { barcode, pantryId } = request.params;

  if (!barcode || !pantryId) {
    return response.status(400).json({
      message: "Missing data.",
    });
  }

  const pantry = await Pantry.findById(pantryId);

  const index = pantry.items.findIndex(
    (element) => element.barcode === barcode
  );

  console.log("ANTEss", pantry.items);

  if (index >= 0) {
    pantry.items.splice(index, 1);
    await pantry.save();
  }

  console.log("Depois", pantry.items);
  return response.send();
}

export default deleteItem;
