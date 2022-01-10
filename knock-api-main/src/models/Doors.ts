import { DataTypes } from 'sequelize'
import sequelize from '../config/database'

const Doors = sequelize.define(
  'doors',
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    code: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
    },    
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    tableName: 'doors',
  }
)

export default Doors
