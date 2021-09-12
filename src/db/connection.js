import mongoose from "mongoose";
import AppError from "../errors/AppError.js";

if (!process.env.MONGO_STRING_CONNECTION) {
  throw new AppError("String de conexão não encontrada.");
}

mongoose.connect(process.env.MONGO_STRING_CONNECTION, (error) => {
  if (error) {
    throw new AppError("Erro de conexão com o banco.", 500);
  }
});

export default mongoose;
