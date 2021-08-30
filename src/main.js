import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`[SERVER STARTED]: Port ${process.env.PORT}`);
});