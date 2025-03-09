import { Router } from 'express';
import { getAccounts, CreateAccount } from '../controllers/Accounts.Controller';

const router = Router();

router.route('/')
    .get((_req, res) => {
        res.json({
            status: 401,
            message: 'Sign in or Sign up'
        });
    });

router.route('/d')
    .get(getAccounts)
    .post(CreateAccount);

export default router;