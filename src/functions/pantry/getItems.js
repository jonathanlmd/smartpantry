import { Pantry, Product, User } from "../../db/models.js";
import AppError from "../../errors/AppError.js";

async function get(request, response) {
  const { userId } = request.params;
  const user = await User.findById(userId);

  if (!userId) {
    throw new AppError("User not found!");
  }

  const pantry = await Pantry.findById(user.pantry[0].id);

  const items = await Product.find({
    barcode: {
      $in: pantry.items.map((element) => element.barcode),
    },
  });

  const itemsWithQuantity = items.map((item) => {
    const product = pantry.items.find(
      (element) => element.barcode === item.barcode
    );
    return {
      ...item._doc,
      quantity: product.quantity,
    };
  });

  console.log(itemsWithQuantity);

  return response.json({
    items: itemsWithQuantity,
  });
}

export default get;
