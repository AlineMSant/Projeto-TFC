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

export default authRouter;
