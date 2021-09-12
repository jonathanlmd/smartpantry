import { product, user, pantry } from "./schemas.js";
import mongoose from "./connection.js";

const Product = mongoose.model("Product", product);
const User = mongoose.model("User", user);
const Pantry = mongoose.model("Pantry", pantry);

export { Product, User, Pantry };
