import { PrismaClient as MongoPrismaClient } from '../generated/mongo-client';
import { PrismaClient as PostgresPrismaClient } from '../generated/postgres-client';

export const mongoPrisma = new MongoPrismaClient();
export const postgresPrisma = new PostgresPrismaClient();

// --- Individual Connect Functions ---
export const connectPostgresDB = async () => {
  try {
    await postgresPrisma.$connect();
    console.log('✅ Postgres Prisma connected');
  } catch (error) {
    console.error('❌ Postgres Prisma connection error:', error);
    throw error;
  }
};

export const connectMongoDB = async () => {
  try {
    await mongoPrisma.$connect();
    console.log('✅ Mongo Prisma connected');
  } catch (error) {
    console.error('❌ Mongo Prisma connection error:', error);
    throw error;
  }
};

// --- Combined Connect Function ---
export const connectAllPrismaDB = async () => {
  try {
    await Promise.all([connectMongoDB(), connectPostgresDB()]);
    console.log('✅ All Prisma DBs connected');
  } catch (error) {
    console.error('❌ Error connecting all Prisma DBs:', error);
    throw error;
  }
};

// --- Disconnect Functions ---
export const disconnectPostgresDB = () => postgresPrisma.$disconnect();
export const disconnectMongoDB = () => mongoPrisma.$disconnect();

export const disconnectAllPrismaDB = () =>
  Promise.all([disconnectMongoDB(), disconnectPostgresDB()]);
