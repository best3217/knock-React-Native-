import { Application } from 'express';
import setupCors from './cors';
import setupRequestBodyParser from './request-body-parser';
import setupRoutes from './routes';
import { checkDatabaseConnection } from './database';
import setupModelRelations from '../models/relations';

export default (application: Application): void => {
  checkDatabaseConnection();
  setupModelRelations();
  setupCors(application);
  setupRequestBodyParser(application);
  setupRoutes(application);
}
