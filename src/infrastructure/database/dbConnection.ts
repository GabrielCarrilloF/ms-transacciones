import { createPool, Pool } from 'mysql2/promise';

let pool: Pool;

export const dbConnection = async (): Promise<Pool> => {
  if (!pool) {
    pool = createPool({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'transactions_db',
      connectionLimit: 10
    });

    console.log("Conexión a la base de datos establecida");
  }
  return pool;
};