import connectDB from "./db";
import app from "./app";
import { Connection } from "mongoose";
import config from "./config";

connectDB()
  .then((connection: Connection | undefined): void => {
    app.listen(config.port, () => {
      console.log(`\n⚙️  Server is running at port : ${config.port}`);
    });
    console.log(`\n📚 Database connected with ${connection?.host}`);
  })
  .catch((err) => {
    console.log("\n⚠️ MONGO DB connection failed !!! ", err);
  });
