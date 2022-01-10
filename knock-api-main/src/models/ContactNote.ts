import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const ContactNote = sequelize.define(
  "contact_note",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    frn_contactid: {
      type: DataTypes.BIGINT
    },
    frn_contact_note_typeid:{
      type: DataTypes.BIGINT
    },
    frn_objectid: {
      type: DataTypes.BIGINT
    },
    note: {
      type: DataTypes.STRING
    },    
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },
  { timestamps: true }
);

export default ContactNote;
