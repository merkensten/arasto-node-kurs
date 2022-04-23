import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import middlewares from "./src/middlewares/Middlewares.js";
import mongoose from "mongoose";

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

mongoose
  .connect("mongodb://localhost/arastotutorialdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => {
    console.log("Error while trying to connect to the db", err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`Servern är igång på ${port}`);
});
