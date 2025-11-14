import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

dotenv.config();


export const sequelizeConfig: SequelizeModuleOptions = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mssql',
    autoLoadModels: true,
    synchronize: true,
    timezone : "-03:00",
    dialectOptions: {
    options: {
        encrypt: false,              
        trustServerCertificate: true
    },
    useUTC: false

  }
    
};