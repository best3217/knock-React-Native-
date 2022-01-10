import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const UserRole = sequelize.define('user_role', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
});

export default UserRole;
