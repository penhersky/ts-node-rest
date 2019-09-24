import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import auth from './routes/auth';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('api/user', auth);

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        ok: 'start',
    });
});

export default app;
