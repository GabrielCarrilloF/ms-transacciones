import { Request, Response } from "express";
import { queryDatabase } from '../infrastructure/database/databaseUtils';
import { Transaction } from '../domain/entities/Transaction';

export async function transferFunds(req: Request, res: Response): Promise<void> {
    
    const { from_account_number, to_account_number, amount: rawAmount, description } = req.body;
    const amount = parseFloat(rawAmount);

    
    if (!from_account_number || !to_account_number || isNaN(amount) || amount <= 0) {
        res.status(400).json({
            status: 400,
            message: 'Missing required fields or invalid amount'
        });
        return;
    }

    try {
    
        await queryDatabase('START TRANSACTION');

    
        const fromAccountData = await queryDatabase(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
            [from_account_number]
        );
        const toAccountData = await queryDatabase(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
            [to_account_number]
        );

    
        if (fromAccountData.length === 0 || toAccountData.length === 0) {
            await queryDatabase('ROLLBACK');
            res.status(404).json({
                status: 404,
                message: 'One or both accounts not found'
            });
            return;
        }

        const fromAccount = fromAccountData[0];
        const toAccount = toAccountData[0];

    
        const fromBalance = Number(fromAccount.balance);
        const toBalance = Number(toAccount.balance);

    
        if (amount > fromBalance) {
            await queryDatabase('ROLLBACK');
            res.status(400).json({
                status: 400,
                message: 'Insufficient funds in the source account'
            });
            return;
        }

    
        const newFromAccountBalance = fromBalance - amount;
        const newToAccountBalance = toBalance + amount;

    
        await queryDatabase(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newFromAccountBalance, from_account_number]
        );

    
        await queryDatabase(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newToAccountBalance, to_account_number]
        );

    
        const transaction = new Transaction(
            'transfer',
            amount,
            fromAccount.currency,
            undefined,
            from_account_number,
            to_account_number,
            description
        );

        await queryDatabase('INSERT INTO transactions SET ?', [transaction]);

    
        await queryDatabase('COMMIT');

        res.json({
            status: 200,
            message: 'Transfer successful',
            transaction
        });
    } catch (error: any) {
    
        await queryDatabase('ROLLBACK');
        res.status(500).json({
            status: 500,
            message: 'Error processing transfer',
            error: error.message
        });
    }
}

export async function withdrawFunds(req: Request, res: Response): Promise<void> {
    const { account_number, amount: rawAmount, description } = req.body;
    const amount = parseFloat(rawAmount);

    if (!account_number || isNaN(amount) || amount <= 0) {
        res.status(400).json({
            status: 400,
            message: 'Missing required fields or invalid amount'
        });
        return;
    }

    try {
        await queryDatabase('START TRANSACTION');

        const accountData = await queryDatabase(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
            [account_number]
        );

        if (accountData.length === 0) {
            await queryDatabase('ROLLBACK');
            res.status(404).json({
                status: 404,
                message: 'Account not found'
            });
            return;
        }

        const account = accountData[0];
        const balance = Number(account.balance);

        if (amount > balance) {
            await queryDatabase('ROLLBACK');
            res.status(400).json({
                status: 400,
                message: 'Insufficient funds in the account'
            });
            return;
        }

        const newBalance = balance - amount;

        await queryDatabase(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newBalance, account_number]
        );

        const transaction = new Transaction(
            'withdrawal',
            amount,
            account.currency,
            undefined,
            account_number,
            undefined,
            description
        );

        await queryDatabase('INSERT INTO transactions SET ?', [transaction]);

        await queryDatabase('COMMIT');

        res.json({
            status: 200,
            message: 'Withdrawal successful',
            transaction
        });
    } catch (error: any) {
        await queryDatabase('ROLLBACK');
        res.status(500).json({
            status: 500,
            message: 'Error processing withdrawal',
            error: error.message
        });
    }
}

export async function depositFunds(req: Request, res: Response): Promise<void> {
    const { account_number, amount: rawAmount, description } = req.body;
    const amount = parseFloat(rawAmount);

    if (!account_number || isNaN(amount) || amount <= 0) {
        res.status(400).json({
            status: 400,
            message: 'Missing required fields or invalid amount'
        });
        return;
    }

    try {
        await queryDatabase('START TRANSACTION');

        const accountData = await queryDatabase(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
            [account_number]
        );

        if (accountData.length === 0) {
            await queryDatabase('ROLLBACK');
            res.status(404).json({
                status: 404,
                message: 'Account not found'
            });
            return;
        }

        const account = accountData[0];
        const balance = Number(account.balance);

        const newBalance = balance + amount;

        await queryDatabase(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newBalance, account_number]
        );

        const transaction = new Transaction(
            'deposit',
            amount,
            account.currency,
            undefined,
            account_number,
            undefined,
            description
        );

        await queryDatabase('INSERT INTO transactions SET ?', [transaction]);

        await queryDatabase('COMMIT');

        res.json({
            status: 200,
            message: 'Deposit successful',
            transaction
        });
    } catch (error: any) {
        await queryDatabase('ROLLBACK');
        res.status(500).json({
            status: 500,
            message: 'Error processing deposit',
            error: error.message
        });
    }
}

export async function listAllTransfers(req: Request, res: Response): Promise<void> {
    try {
        const transfers = await queryDatabase(
            'SELECT * FROM transactions'
        );

        res.json({
            status: 200,
            message: 'Transfers retrieved successfully',
            transfers
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving transfers',
            error: error.message
        });
    }
}

export async function getTransferById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            status: 400,
            message: 'Missing required field: id'
        });
        return;
    }

    try {
        const transfer = await queryDatabase(
            'SELECT * FROM transactions WHERE id = ?',
            [id]
        );

        if (transfer.length === 0) {
            res.status(404).json({
                status: 404,
                message: 'Transfer not found'
            });
            return;
        }

        res.json({
            status: 200,
            message: 'Transfer retrieved successfully',
            transfer: transfer[0]
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving transfer',
            error: error.message
        });
    }
}