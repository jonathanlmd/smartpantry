import { product, user } from "./schemas.js";
import mongoose from "./connection.js";

const Product = mongoose.model("Product", product);
const User = mongoose.model("User", user);

export { Product, User };
