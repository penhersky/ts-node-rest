import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import { NotFoundError, ServerError } from './middleware/app.middleware';

import auth from './routes/auth';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('api/user', auth);
app.use('api/user', auth);

app.use(NotFoundError);
app.use(ServerError);

export default app;
