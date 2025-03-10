import { Request, Response } from 'express';
import { queryDatabase } from '../infrastructure/database/databaseUtils';
import { AccountService } from '../application/services/AccountProtection.Service';
import { Account } from '../domain/entities/Account';



export async function CreateAccount(req: Request, res: Response): Promise<void> {
    const { account_type, account_holder_id, holder_name, balance = 0, currency= 'COP', status = 'active' } = req.body;

    if (!account_type || !account_holder_id || !holder_name ) {
        res.status(400).json({
            status: 400,
            message: 'Missing required fields'
        });
    }

    let account_number: string;
    let accountExists: boolean;

    do {
        account_number = generateAccountNumber();
        const existingAccount = await queryDatabase('SELECT * FROM accounts WHERE account_number = ?', [account_number]);
        accountExists = existingAccount.length > 0;
    } while (accountExists);

    const newAccount = new Account(account_number, account_type, account_holder_id, holder_name, balance, currency, status);

    try {
        await queryDatabase('INSERT INTO accounts SET ?', [newAccount]);
        res.json({
            status: 200,
            message: 'Account created',
            account: newAccount
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error creating account',
            error: error.message
        });
    }
}

export async function getAccount(req: Request, res: Response): Promise<void> {
    const account_number = req.params.accountNumber;

    try {
        const account = await queryDatabase('SELECT * FROM accounts WHERE account_number = ?', [account_number]);
        const AccountProtection = await AccountService.profileAccountDetailed(account[0]);
        res.json(AccountProtection);
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving account',
            error: error.message
        });
    }
}

export async function getAccountsByUser(req: Request, res: Response): Promise<void> {
    const account_holder_id = req.params.accountHolderId;

    try {
        const accounts = await queryDatabase('SELECT * FROM accounts WHERE account_holder_id = ?', [account_holder_id]);
        const profiledAccounts = accounts.map((account: any) => AccountService.profileAccountDetailed(account));
        res.json(profiledAccounts);
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving accounts',
            error: error.message
        });
    }
}

export async function updateAccount(req: Request, res: Response): Promise<void> {
    const account_number = req.params.accountNumber;
    const { balance, status } = req.body;

    if (balance === undefined && status === undefined) {
        res.status(400).json({
            status: 400,
            message: 'Missing required fields'
        });
    }

    try {
        if (balance !== undefined) {
            await queryDatabase('UPDATE accounts SET balance = ? WHERE account_number = ?', [balance, account_number]);
        }
        if (status !== undefined) {
            await queryDatabase('UPDATE accounts SET status = ? WHERE account_number = ?', [status, account_number]);
        }
        res.json({
            status: 200,
            message: 'Account updated'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error updating account',
            error: error.message
        });
    }
}


function generateAccountNumber(): string {
    const length = 10;
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}