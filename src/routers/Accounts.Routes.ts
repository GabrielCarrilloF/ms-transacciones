import { Router } from 'express';

const router = Router();

router.route('/')
    .get((_req, res) => {
        res.json({
            status: 401,
            message: 'Sign in or Sign up'
        });
    });

export default router;