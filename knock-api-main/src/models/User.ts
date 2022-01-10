import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  name: {
    type: DataTypes.STRING,
  },  
  email: {
    type: DataTypes.STRING,
  },
  password:{
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  frn_user_roleid: {
    type: DataTypes.BIGINT,
  },
  phone_verification_code: {
    type: DataTypes.INTEGER,
  },
  is_phone_verified:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_email_verified:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_locked:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  frn_doorid: {
    type: DataTypes.BIGINT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
})

export default User
