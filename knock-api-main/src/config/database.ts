import {
  Sequelize,
  Options,
  ReplicationOptions,
  ConnectionOptions,
  PoolOptions
} from 'sequelize';
import { DB_CONFIGURATION } from './constants';

const {
  DB_NAME,
  DB_PORT,
  DB_HOST_READ,
  DB_HOST_WRITE,
  DB_USER_READ,
  DB_USER_WRITE,
  DB_PASS_READ,
  DB_PASS_WRITE,
  APP_ENV
} = DB_CONFIGURATION;

const readConnectionOptions: ConnectionOptions = {
  database: DB_NAME,
  host: DB_HOST_READ,
  port: DB_PORT,
  username: DB_USER_READ,
  password: DB_PASS_READ
};

const writeConnectionOptions: ConnectionOptions = {
  database: DB_NAME,
  host: DB_HOST_WRITE,
  port: DB_PORT,
  username: DB_USER_WRITE,
  password: DB_PASS_WRITE
};

const replication: ReplicationOptions = {
  read: [readConnectionOptions],
  write: writeConnectionOptions
};

const pool: PoolOptions = {
  max: 10
};

const databaseOptions: Options = {
  dialect: 'mysql',
  replication,
  pool,
  define: {
    freezeTableName: true,
  },
  logging: false,
};

let sequelize: any = null;

if(APP_ENV == 'prod'){
    sequelize = new Sequelize(databaseOptions);
//   sequelize = new Sequelize(DB_NAME, DB_USER_WRITE, DB_PASS_WRITE, {
//     dialect: 'mysql',
//     host: DB_HOST_WRITE,
//     pool: {
//       max: 10,
//     },
//     define: {
//       freezeTableName: true,
//     },
//     dialectOptions: {
//       socketPath: DB_HOST_WRITE,
//     },
//     logging: false
//   });
}else{
  sequelize = new Sequelize(databaseOptions);
}


export const checkDatabaseConnection = async (): Promise<any> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    console.log('Connection to the database has been established successfully.');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
