import './configs/env';
import express, { Express } from 'express';
import mainRoutes from './routes';
import {
  connectPostgresDB,
  disconnectAllPrismaDB,
} from './configs/prisma-db.config';
// import connectPostgresDB from './configs/postgres-db.config';

const app: Express = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/', mainRoutes);

(async () => {
  try {
    await connectPostgresDB();

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
