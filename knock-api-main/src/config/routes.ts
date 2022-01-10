import { Application } from 'express'

import { API_BASE_PATH_V1, API_BASE_PATH_V2 } from './constants'
import commonRoutes from '../routes/common';
import authRoutes from '../routes/auth';
import userRoutes from '../routes/user';

export default (application: Application): void => {
  application.use(API_BASE_PATH_V1, commonRoutes);
  application.use(`${API_BASE_PATH_V1}/auth`, authRoutes);
  application.use(`${API_BASE_PATH_V1}/users`, userRoutes);
}
