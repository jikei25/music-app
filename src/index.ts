import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as database from './config/database';
import Topic from './models/topic.model';
import clientRoutes from './routes/client/index.route';

dotenv.config();
database.connect();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('views', './src/views');
app.set('view engine', 'pug');

clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
