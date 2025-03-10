import { Router } from "express";
import { transferFunds, withdrawFunds, depositFunds } from '../controllers/Transaction.Controller';

const router = Router();

router.route('/')
    .get((_req, res) => {
        res.json({
            status: 404,
            message: ':( No transactions found. Please provide valid data.'
        });
    });

router.route('/transfer')
    .post(transferFunds);

router.route('/withdraw')
    .post(withdrawFunds);

router.route('/deposit')
    .post(depositFunds);

export default router;