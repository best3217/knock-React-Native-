import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Contact = sequelize.define('contact', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  frn_from_userid: {
    type: DataTypes.BIGINT,
  },
  frn_to_userid: {
    type: DataTypes.BIGINT,
  },
  is_read_from: {
    type: DataTypes.BOOLEAN
  },
  is_read_to: {
    type: DataTypes.BOOLEAN
  },
  status: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
});

export default Contact;
