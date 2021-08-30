import mongoose from "mongoose";

if (!process.env.MONGO_STRING_CONNECTION) {
  throw new Error("Missing string connection");
}

mongoose.connect(process.env.MONGO_STRING_CONNECTION, (error) => {
  if (error) {
    throw new Error("Erro de conexão", error);
  }
});

export default mongoose;
