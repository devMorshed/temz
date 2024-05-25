import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import errorHandler from "./middleware/ErrorHandler";
import ApiError from "./utils/ApiError";
import router from "./app/routes";

const app: Application = express();

app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

// Parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// All ROUTES from src/app/routes
app.use('/api/v1/', router)

// PING_TEST Routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({
    success: true,
    message: "SERVER Pingin... 📍",
  })
)

// ALL Catch Route
app.all("*", (req: Request) => {
  throw new ApiError(`Route ${req.originalUrl} not found`, 404);
});

// Globar Error Middleware
app.use(errorHandler);

export default app;
