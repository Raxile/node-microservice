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


const ENV = {
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME
}


export default ENV