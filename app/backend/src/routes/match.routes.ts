import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import MatchController from '../controllers/MachController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAll(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.update(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateTeams,
  (req: Request, res: Response) => matchController.create(req, res),
);

export default router;
