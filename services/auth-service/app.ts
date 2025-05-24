import 'dotenv/config';
import express, { Express } from 'express';
import mainRoutes from './routes';
import connectPostgresDB from './configs/postgres-db.config';
import connectMongoDB from './configs/mongo-db.config';

const app: Express = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/', mainRoutes);

(async () => {
  try {
    await connectMongoDB();
    await connectPostgresDB();

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('❌ Some error occurred while connecting to DBs:', error);
    process.exit(1);
  }
})();
