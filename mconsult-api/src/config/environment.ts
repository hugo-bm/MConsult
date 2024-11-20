import dotenv from "dotenv";

dotenv.config();

const appConfig = {
    databaseUrl: process.env.DATABASE_URL || "",
    htmlPort: parseInt(process.env.APP_PORT as string) || 3830,
    jwtSecret: String(process.env.JWT_SECRET),
    jwtExpiresIn: String(process.env.JWT_EXPIRES),
    salt_crypto: parseInt(process.env.SALT_CRYPTO as string) || 10,
  };
  export default appConfig