import { Router } from 'express';
import teamRouter from './team.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', authRouter);

export default router;
