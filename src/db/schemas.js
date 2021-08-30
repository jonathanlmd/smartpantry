import mongoose from "./connection.js";

const product = new mongoose.Schema({
  barcode: String,
  name: String,
  image: String,
  brand: String,
  unity: String,
  created_date: Date,
  updated_date: Date,
});

const user = new mongoose.Schema({
  name: String,
  pantry: {
    name: String,
    uuid: String,
    items: [
      {
        barcode: String,
        quantity: Number,
      },
    ],
  },
});

export { product, user };
