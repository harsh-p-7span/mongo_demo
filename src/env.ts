import * as dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string): string => {
    if (typeof process.env[key] === "undefined") {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
};

// App Settings
export const NodeEnv = getEnv("NODE_ENV");
export const Host = getEnv("SERVER_URL");
export const Port = getEnv("APP_PORT");
export const WebsiteUrl = getEnv("WEBSITE_URL");
export const DatabaseUrl = getEnv("DATABASE_URL");

// API Configurations
export const ApiPrefix = getEnv("API_PREFIX");
export const UserUploadedContentPath = getEnv("USER_UPLOADED_CONTENT_PATH");
export const JwtSecretKey = getEnv("JWT_SECRET_KEY");

export const RootDir = getEnv("NODE_ENV") === "production" ? "dist" : "src";

// CORS
export const Cors = getEnv("CORS_AVAILABLE_LINKS");

// Credentials
export const PosDefaultPassword = getEnv("POS_DEFAULT_PASSWORD");
export const BrandUserDefaultPassword = getEnv("BRAND_DEFAULT_PASSWORD");
