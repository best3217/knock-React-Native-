import { Application } from 'express';
import cors from 'cors';
import { ENVIRONMENT } from './constants';

export const productionCorsList = [
  "*",  
];

const createOriginList = (): string[] =>
  ENVIRONMENT === 'development'
    ? [
        'http://localhost:3000',    
        'http://localhost:8081',        
      ]
    : productionCorsList;
  
export default (application: Application): void => {
  application.use(
    cors({
      origin: createOriginList(),
      credentials: true
    })
  );
};
