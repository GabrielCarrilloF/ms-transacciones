export class Account {
    constructor(
        public account_number: string,
        public account_type: 'savings' | 'checking',
        public account_holder_id: number,
        public holder_name: string,
        public balance: number,
        public currency: string,
        public status: 'active' | 'suspended' = 'active',
        public id?: number,
        public created_at?: Date,
        public updated_at?: Date
    ) {}
}