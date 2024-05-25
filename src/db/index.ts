import mongoose, { Connection } from "mongoose";
import config from "../config";

const MAX_RETRIES = 50;
let retries = 0;

const connectDB = async (): Promise<Connection | undefined> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.dbUrl}/${config.dbName}`
    );
    console.log("Successfully connected to the database");
    retries = 0;
    return connectionInstance.connection;
  } catch (error) {
    retries++;
    console.error(
      `Failed to connect to the database (Attempt ${retries}/${MAX_RETRIES}) ⚠️ \n ${error}`
    );

    if (retries >= MAX_RETRIES) {
      console.error("Max retries reached. Exiting...");
      process.exit(1);
    }

    const retryDelay = Math.min(5000 * retries, 300000);

    setTimeout(() => {
      console.log(
        "Retrying to connect to the database...",
        `${retryDelay / 1000} seconds`
      );
      connectDB();
    }, retryDelay);
  }
};

export default connectDB;
