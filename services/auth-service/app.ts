import './configs/env';
import express, { Express } from 'express';
import mainRoutes from './routes';
import {
  connectAllPrismaDB,
  disconnectAllPrismaDB,
} from './configs/prisma-db.config';
// import connectPostgresDB from './configs/postgres-db.config';
import connectMongoDB from './configs/mongo-db.config';

const app: Express = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/', mainRoutes);

(async () => {
  try {
    await connectMongoDB();
    // await connectPostgresDB();

    await connectAllPrismaDB();

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    process.on('SIGINT', async () => {
      console.log('application shutdown');
      await disconnectAllPrismaDB();
      process.exit(0);
    });
  } catch (error) {
    console.log('❌ Some error occurred while connecting to DBs:', error);
    process.exit(1);
  }
})();
