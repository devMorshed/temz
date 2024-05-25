import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  nodeEnv: process.env.NODE_ENV,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME || "",
  // Cloud Storage
  cloudName: process.env.CLOUD_NAME,
  cloudApi: process.env.CLOUD_API,
  cloudApiSecret: process.env.CLOUD_API_SECRET,
  // Redis
  redisUrl: process.env.REDIS_URL || "",
  redisToken: process.env.REDIS_TOKEN || "",
  // Auth
  activationSecret: process.env.ACTIVATION_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  // SMTP
  smtpPort: process.env.SMTP_PORT,
  smtpHost: process.env.SMTP_HOST,
  smtpService: process.env.SMTP_SERVICE,
  smtpMail: process.env.SMTP_MAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
};
