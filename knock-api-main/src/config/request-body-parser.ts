import bodyParser from 'body-parser';
import { Application } from 'express';

export default (application: Application): void => {
  application.use(bodyParser.json());
  application.use(bodyParser.urlencoded({ extended: true }));
};
