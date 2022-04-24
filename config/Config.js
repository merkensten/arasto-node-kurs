import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
  try {
    const DB_URL = process.env.DATABASE_URL;
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

const connectToPort = (app) => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default { connectToDB, connectToPort };
