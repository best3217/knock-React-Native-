import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Settings = sequelize.define('settings', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    label: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
});

export default Settings;
