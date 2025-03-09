import { createPool } from 'mysql2/promise';

export async function dbConnection(){
  const connection = await createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transactions_db',
    connectionLimit: 10
  });
  return connection;
}