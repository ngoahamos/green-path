import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import "express-async-errors";


import { errorHandler } from './src/middlewares/error.middleware';
import { notFoundHandler } from './src/middlewares/not-found.middleware';
import { logger } from './src/utils/logger';
import healthRouter from './src/routes/health.router';
import authRouter from './src/routes/auth.router';
import emissionRouter from './src/routes/emissions.router';
import analyticsRouter from './src/routes/analytics.router';




dotenv.config();

const port = process.env.PORT;

const app: Application = express();
const api_version = process.env.VERSION ?? 'v1';

const urlencoded_body_parser = bodyParser.urlencoded({
    extended: true,
});

const DB_URL: string = process.env.DB ?? '';

mongoose
  .connect(DB_URL)
  .then(() => {
    logger.info("connted to DB");

  })
  .catch((e) => logger.error(e));

app.use(bodyParser.json());
app.use(urlencoded_body_parser);

const corsOptions = {
    origin: ['*'], // TODO: change this before production
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Few security measures
app.disable('x-powered-by');
app.use(helmet())
app.use(helmet.hsts({
    maxAge: 31536000,     // 1 year in seconds
    includeSubDomains: true,
    preload: true
}));

// We don't want to give anyone ideas of what server we are running on.
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, must-revalidate');
    res.set('Server', 'hidden');
    next();
});


app.use(express.json());
app.use(cors(corsOptions));

const prefix = `/api/${api_version}`;

app.use('', healthRouter);
app.use(prefix, healthRouter);

app.use(prefix + '/auth', authRouter);

app.use(prefix + '/emissions', emissionRouter);

app.use(prefix + '/analytics', analyticsRouter);



app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);

});