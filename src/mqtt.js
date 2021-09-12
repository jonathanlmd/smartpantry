import connectOptions from "./config/mqtt.js";
import mqtt from "mqtt";
import { Product, User } from "./db/models.js";
import axios from "axios";
import AppError from "./errors/AppError.js";

async function handleMqtt() {
  const client = mqtt.connect(
    `${connectOptions.protocol}://${connectOptions.host}:${connectOptions.port}`,
    connectOptions
  );

  client.on("error", (error) => {
    throw new AppError(`Falha ao conectar com o broker: ${error.message}`, 500);
  });

  client.on("connect", async (packet) => {
    console.log("Connected.");

    client.subscribe(["pantry.add"], (error) => {
      if (error) {
        throw new AppError(`Erro ao subscrever: ${error.message}`, 500);
      }
    });

    client.on("message", async (topic, payload, packet) => {
      try {
        console.log("ON MESSAGE: ", topic, payload.toString());
        if (topic === "pantry.add") {
          let [id, barcode] = payload.toString().split("/");
          barcode = barcode.replace(/(\r\n|\n|\r)/gm, "");
          id = id.replace(/(\r\n|\n|\r)/gm, "");

          console.log([id, barcode]);

          let item = null;

          if (!barcode) {
            return response.status(400).json({
              message: "Missing barcode.",
            });
          }
          console.log("Access");

          if (!process.env.ACCESS_TOKEN) {
            throw new AppError("Token de acesso da api não informado.", 500);
          }

          console.log("Find");

          // Check if exist in database;
          const storedProduct = await Product.findOne({ barcode });

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

          if (!user) return;

          const itemIndex = user.pantry.items.findIndex(
            (element) => element.barcode === item.barcode
          );

          if (itemIndex < 0) {
            user.pantry.items.push({
              barcode: item.barcode,
              quantity: 1,
            });
          } else {
            user.pantry.items[itemIndex].quantity++;
          }
          await user.save();

          client.publish("pantry.added", payload);
        }
      } catch (err) {
        console.log({ Erro: err });
      }
    });
  });
}

export default handleMqtt;
