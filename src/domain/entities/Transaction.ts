import { ITransaction } from '../interfaces/ITransaction';

export class Transaction implements ITransaction {
    constructor(
        public transaction_type: 'deposit' | 'withdrawal' | 'transfer',
        public amount: number,
        public currency: string,
        public id?: number,
        public from_account_id?: number,
        public to_account_id?: number,
        public description?: string,
        public transaction_date?: Date
    ) {}
}