import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as database from './config/database';
import clientRoutes from './routes/client/index.route';

dotenv.config();
database.connect();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static('src/public'));
app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'pug');

clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
