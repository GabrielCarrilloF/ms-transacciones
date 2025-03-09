export interface IAccounts {
    id?: number;
    account_number: string;
    account_type: 'savings' | 'checking';
    account_holder_id: number;
    holder_name: string;
    balance: number;
    currency: string;
    created_at?: Date;
    updated_at?: Date;
}