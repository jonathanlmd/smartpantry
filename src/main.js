import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(9000, (req, res) => {
  console.log("[SERVER STARTED]: Port 9000");
});
