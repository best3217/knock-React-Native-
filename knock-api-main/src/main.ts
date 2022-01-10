if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Application } from 'express';
import { createServer } from 'http';
import { APP_PORT } from './config/constants';
import setup from './config';
import setupIO from './services/io';

const application: Application = express();

const httpServer = createServer(application);

setup(application);
setupIO(httpServer);

httpServer.listen(APP_PORT, (): void => {
  console.log('Knock server listening on port', APP_PORT);
});
