import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import middlewares from "./src/middlewares/Middlewares.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(morgan("common"));

app.get("/recipe", (req, res) => {
  res.send("Panckakes");
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Servern är igång på ${port}`);
});
