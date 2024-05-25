import { ZodError } from "zod";
import mongoose from "mongoose";
import { createLogger, format, transports } from "winston";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

// Define the Winston logger configuration
const logger = createLogger({
  level: "info", // Adjust log level based on environment (e.g., "debug" for development)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // Include stack trace for all errors
    format.json()
  ),
  transports: [
    new transports.Console(), // Log to console
    // Add additional transports for file logging, etc. (optional)
  ],
});

type CustomError = {
  code?: number | string;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
};

function classifyError(err: Error): string {
  if (err instanceof ZodError) {
    return "Validation Error";
  } else if (err instanceof mongoose.Error) {
    return "Mongoose Error";
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    return "Authorization Error";
  } else if (err.name === "UnauthorizedError") {
    return "Unauthorized Access";
  } else if (err instanceof ApiError) {
    return "API Error";
  } else {
    return "Unhandled Error";
  }
}

export default function errorHandler(err: Error & CustomError) {
  // Default error response
  let statusCode = 500;
  let message = "Internal Server Error";

  // Handle specific error types
  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map((issue) => issue.message).join(", ");
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Resource not found! Invalid: ${err.path}`;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  } else if (err.code === 11000 && err.keyValue) {
    statusCode = 400;
    message = `Duplicate ${Object.keys(err.keyValue).join(", ")} entered`;
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Invalid or expired JSON Web Token";
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "You are not authorized to perform this action";
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Log unhandled errors and consider classification
    const errorClass = classifyError(err);
    logger.error({ message: err.message, stack: err.stack, class: errorClass });
  }

  return new ApiResponse({
    statusCode,
    message,
    success: false,
    data: process.env.NODE_ENV === "development" && err.stack,
  });
}
