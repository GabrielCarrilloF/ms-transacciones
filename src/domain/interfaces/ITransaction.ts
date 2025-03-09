export interface ITransaction {
    id?: number;
    from_account_id?: number;
    to_account_id?: number;
    transaction_type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description?: string;
    transaction_date?: Date;
}