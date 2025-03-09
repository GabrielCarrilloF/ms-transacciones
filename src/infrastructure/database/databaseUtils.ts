import { dbConnection } from './dbConnection';

export async function queryDatabase(query: string, params: any[] = []): Promise<any> {
    const connection = await dbConnection();
    const [results] = await connection.query(query, params);
    return results;
}