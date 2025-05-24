import 'dotenv/config';
import express, { Express } from 'express';
import connectDB from './configs/db.config';
import mainRoutes from './routes';

const app: Express = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/', mainRoutes);

connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`[server]: Server is running at http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.log('some error occurred', error);
    process.exit(1);
  });
