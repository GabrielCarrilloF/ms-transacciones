import { Router } from 'express';
import { getAccount, getAccountsByUser, CreateAccount, updateAccount } from '../controllers/Accounts.Controller';

const router = Router();

router.route('/')
    .get((_req, res) => {
        res.json({
            status: 401,
            message: 'Sign in or Sign up'
        });
    });

router.route('/create')
    .post(CreateAccount);

router.route('/:accountNumber')
    .get(getAccount);

router.route('/user/:accountHolderId')
    .get(getAccountsByUser);

router.route('/update/:accountNumber')
    .put(updateAccount);

export default router;