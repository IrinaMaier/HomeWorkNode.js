import { Sequelize } from 'sequelize';
import configFile from './config.json' assert { type: 'json' };

const env = 'development';
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false
  }
);

export default sequelize;