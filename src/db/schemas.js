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

const pantry = new mongoose.Schema({
  name: String,
  hash: String,
  items: [
    {
      barcode: String,
      quantity: Number,
    },
  ],
});

const user = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  pantry: [
    {
      id: String,
      name: String,
    },
  ],
});

export { product, user, pantry };
