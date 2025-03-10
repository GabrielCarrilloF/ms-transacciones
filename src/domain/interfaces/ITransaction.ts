export interface ITransaction {
    id?: number;
    from_account_number?: string;
    to_account_number?: string;
    transaction_type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description?: string;
    transaction_date?: Date;
}