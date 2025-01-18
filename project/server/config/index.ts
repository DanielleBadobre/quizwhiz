import { config } from 'dotenv';

// Load environment variables
config();

// Define types for better type safety
interface RateLimit {
  WINDOW_MS: number;
  MAX_REQUESTS: number;
}

interface Config {
  PORT: number;
  MONGODB_URI: string;
  GEMINI_API_KEY: string;
  NODE_ENV: 'development' | 'production' | 'test';
  CORS_ORIGIN: string;
  RATE_LIMIT: RateLimit;
}

// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY'] as const;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}. Please check your .env file.`);
  }
}

// Export typed configuration
export const CONFIG: Config = {
  PORT: Number(process.env.PORT) || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/quizzwhiz',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  NODE_ENV: (process.env.NODE_ENV as Config['NODE_ENV']) || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  }
} as const;

// Validate PORT is a number
if (isNaN(CONFIG.PORT)) {
  throw new Error('PORT must be a number');
}