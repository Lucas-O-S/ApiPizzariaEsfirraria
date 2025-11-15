import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function executeInitSQL(sequelize: any): Promise<void> {
  try {
    const sqlPath = path.join(process.cwd(), 'database', 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    const commands = sql
      .split(/\n\s*GO\s*\n/i)
      .filter(cmd => cmd.trim().length > 0)
      .map(cmd => cmd.trim());

    for (const command of commands) {
      if (command) {
        try {
          await sequelize.query(command);
        } catch (error) {
          console.error('✗ Erro ao executar comando SQL:', error);
        }
      }
    }

    console.log('✓ Database inicializado com sucesso via init.sql');
  } catch (error) {
    console.error('✗ Erro ao ler/executar init.sql:', error);
  }
}

export const sequelizeConfig: SequelizeModuleOptions = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mssql',
    autoLoadModels: true,
    synchronize: false,
    timezone : "-03:00",
    dialectOptions: {
    options: {
        encrypt: false,              
        trustServerCertificate: true
    },
    useUTC: false
  },
    logging: false,
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
} as SequelizeModuleOptions & { 
  hooks?: any 
};