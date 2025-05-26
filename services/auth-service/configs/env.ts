import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';
const envPath = path.resolve(__dirname, `../.env.${env}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`Loaded environment from .env.${env}`);
} else {
  console.warn(`No .env.${env} file found, loading default .env`);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}
