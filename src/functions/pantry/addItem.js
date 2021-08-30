import { Product, User } from "../../db/models.js";
import axios from "axios";

async function addItem(request, response) {
  const { barcode, id } = request.params;
  let item = null;

  if (!barcode) {
    return response.status(400).json({
      message: "Missing barcode.",
    });
  }

  if (!process.env.ACCESS_TOKEN) {
    throw new Error("Missing api access token.");
  }
  // Check if exist in database;
  const storedProduct = await Product.findOne({ barcode }).exec();

  if (!storedProduct) {
    //If not exist, insert;
    const res = await axios.get(
      `http://brasilapi.simplescontrole.com.br/mercadoria/consulta/?ean=${barcode}&access-token=${process.env.ACCESS_TOKEN}`
    );

    if (res.data && res.data.return) {
      const product = new Product({
        name: res.data.return.nome,
        barcode: res.data.return.ean,
        image: res.data.return.imagem_produto,
        brand: res.data.return.marca_nome,
        unity: res.data.return.tipo_embalagem,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      });
      const promise = product.save();

      const dbData = await promise;
      item = {
        id: dbData._id,
        barcode: dbData.barcode,
        name: dbData.name,
        image: dbData.image,
        brand: dbData.brand,
        unity: dbData.unity,
        created_date: dbData.created_date,
        updated_date: dbData.updated_date,
      };
    } else {
      return response.status(400).json({
        message: "Barcode not found",
      });
    }
  } else {
    item = {
      id: storedProduct._id,
      barcode: storedProduct.barcode,
      name: storedProduct.name,
      image: storedProduct.image,
      brand: storedProduct.brand,
      unity: storedProduct.unity,
      created_date: storedProduct.created_date,
      updated_date: storedProduct.updated_date,
    };
  }

  if (!item) {
    return response.status(400).json({
      message: "Intern error.",
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return response.status(400).json({
      message: "User not found.",
    });
  }

  const itemIndex = user.pantry.items.findIndex(
    (element) => element.barcode === item.barcode
  );

  console.log("AAA", user.pantry.items);

  if (itemIndex < 0) {
    user.pantry.items.push({
      id: item.barcode,
      quantity: 1,
    });
  } else {
    user.pantry.items[itemIndex] = user.pantry.items[itemIndex].quantity + 1;
  }

  const pushReq = await user.save();

  if (!pushReq) {
    return response.status(400).json({
      message: "Error in insert item in pantry.",
    });
  }

  return response.json(user);
}

export default addItem;
