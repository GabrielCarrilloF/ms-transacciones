import { Request, Response } from 'express';
import { dbConnection } from '../infrastructure/database/dbConnection';
import { IAccounts } from '../interfaces/IAccounts';

export async function getAccounts(_req: Request, res: Response): Promise<void> {
    const connection = await dbConnection();
    const [accounts] = await connection.query('SELECT * FROM accounts');
    res.json(accounts);
}

export async function CreateAccount(req: Request, res: Response): Promise<void> {
    const connection = await dbConnection();
    const NewAccount: IAccounts = req.body;

    try {
        await connection.query(
            'INSERT INTO accounts SET ?',[NewAccount]);
        res.json({
            status: 200,
            message: 'Account created'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error creating account',
            error: error.message
        });
    }
}