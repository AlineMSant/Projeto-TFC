import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validations from '../middlewares/Validations';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);

authRouter.get(
  '/role',
  Validations.validateToken,
  (req, res) => authController.getUserRole(req, res),
);

export default authRouter;
