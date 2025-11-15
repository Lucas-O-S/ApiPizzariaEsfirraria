import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const sqlPath = path.join(__dirname, 'database', 'init.sql');
const sqlScript = fs.readFileSync(sqlPath, 'utf8');

async function initDb() {
  const admin = new Sequelize('master', process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      options: { encrypt: false, trustServerCertificate: true },
    },
  });

  // 🔹 1. Criar banco caso não exista
  await admin.query(`
    IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${process.env.DB_NAME}')
    BEGIN
        CREATE DATABASE [${process.env.DB_NAME}];
    END
  `);

  console.log("✅ Banco verificado/criado");

  await admin.close();

  // 🔹 2. Conectar no banco já criado
  const db = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: 'mssql',
      logging: false,
      dialectOptions: {
        options: { encrypt: false, trustServerCertificate: true },
      },
    }
  );

  // 🔹 3. Executar o script de tabelas
  console.log("🔍 Criando tabelas...");
  // Dividir por GO (delimitador do SQL Server)
  const statements = sqlScript
    .split(/\n\s*GO\s*\n/i)
    .filter(stmt => stmt.trim().length > 0);

  for (const stmt of statements) {
    const sql = stmt.trim();
    if (sql.length === 0) continue;

    console.log("> Executando:", sql.substring(0, 40));
    try {
      await db.query(sql);
    } catch (error) {
      console.error("Erro ao executar comando:", error);
      throw error;
    }
  }

  console.log("✅ Tabelas criadas!");

  await db.close();
}

initDb().catch(err => console.error("❌ Erro:", err));
