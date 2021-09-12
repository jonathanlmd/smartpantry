import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes.js";
import handleMqtt from "./mqtt.js";
import AppError from "./errors/AppError.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.path}]`);
  next();
});

app.use(routes);

app.use((err, request, response, _) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Error: ", err);

  return response.status(500).json({
    static: "error",
    message: "internal server error.",
  });
});

handleMqtt();

app.listen(process.env.PORT, () => {
  console.log(`[SERVER STARTED]: Port ${process.env.PORT}`);
});
