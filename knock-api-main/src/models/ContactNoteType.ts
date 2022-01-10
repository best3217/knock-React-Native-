import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const ContactNoteType = sequelize.define('contact_note_type', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  label: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
});

export default ContactNoteType;
