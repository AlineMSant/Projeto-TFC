import { Router } from 'express';
import teamRouter from './team.routes';
import authRouter from './auth.routes';
import matchRouter from './match.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', authRouter);
router.use('/matches', matchRouter);

export default router;
