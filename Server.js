import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.get("/recipe", (req, res) => {
  res.send("Panckakes");
});

app.listen(port, () => {
  console.log(`Servern är igång på ${port}`);
});
