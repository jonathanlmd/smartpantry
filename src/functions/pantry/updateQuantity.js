import { Pantry, Product, User } from "../../db/models.js";

async function updateQuantity(request, response) {
  const { barcode, pantryId, quantity } = request.body;

  console.log(barcode, pantryId, quantity);

  if (!barcode || !pantryId || !quantity) {
    return response.status(400).json({
      message: "Missing data.",
    });
  }

  const pantry = await Pantry.findById(pantryId);

  const index = pantry.items.findIndex(
    (element) => element.barcode === barcode
  );

  console.log(index);

  console.log(pantry.items[index]);

  if (index >= 0) {
    pantry.items[index] = { ...pantry.items[index], quantity: quantity };
  }

  await pantry.save();
  console.log(pantry.items[index]);

  return response.json({
    barcode,
    quantity,
  });
}

export default updateQuantity;
