import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

// Caminho para init.sql
const sqlPath = path.join(__dirname, 'database', 'init.sql');

let sql = '';
try {
  sql = fs.readFileSync(sqlPath, 'utf-8');
} catch (err) {
  console.error(`❌ Não foi possível ler o arquivo init.sql em ${sqlPath}`);
  process.exit(1);
}

// Conexão sem database para criar DB
const sequelizeAdmin = new Sequelize('', process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mssql',
  dialectOptions: {
    options: { encrypt: false, trustServerCertificate: true },
  },
});

// Conexão com o DB
const sequelizeDb = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mssql',
    dialectOptions: {
      options: { encrypt: false, trustServerCertificate: true },
    },
  }
);

async function initDb() {
  try {
    // Cria banco se não existir
    await sequelizeAdmin.query(
      `IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${process.env.DB_NAME}')
       BEGIN
         CREATE DATABASE [${process.env.DB_NAME}];
       END`
    );
    console.log('✅ Banco verificado/criado');


  } catch (err) {
    console.error('❌ Erro ao inicializar DB:', err);
  } finally {
    await sequelizeAdmin.close();
    await sequelizeDb.close();
  }
}

initDb();
