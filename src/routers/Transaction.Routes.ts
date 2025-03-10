import { Router } from "express";
import { transferFunds, withdrawFunds, depositFunds, getTransferById, listAllTransfers } from '../controllers/Transaction.Controller';

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

router.route('/transfers')
    .get(listAllTransfers);

router.route('/transfers/:id')
    .get(getTransferById);

export default router;