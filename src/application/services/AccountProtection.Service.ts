import { Account } from '../../domain/entities/Account';

export class AccountService {
    static profileAccountDetailed(account: Account): any {
        return {
            account_number: account.account_number,
            account_type: account.account_type,
            account_holder_id: account.account_holder_id,
            holder_name: account.holder_name,
            balance: account.balance,
            currency: account.currency,
            created_at: account.created_at
        };
    }
}