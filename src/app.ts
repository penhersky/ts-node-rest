import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import { NotFoundError, ServerError, AccessControlAllowOrigin } from './middleware/app.middleware';

import auth from './routes/auth';
import dialog from './routes/dialog';
import user from './routes/user';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(AccessControlAllowOrigin);
app.use(express.static(__dirname + '/upload'));

app.use(morgan('dev'));

app.use('/api/user', auth);
app.use('/', dialog);
app.use('/user', user);

app.use(NotFoundError);
app.use(ServerError);

export default app;
