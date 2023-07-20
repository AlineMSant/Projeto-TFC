import { Router } from 'express';
import teamRouter from './team.routes';
import authRouter from './auth.routes';
import matchRouter from './match.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', authRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
