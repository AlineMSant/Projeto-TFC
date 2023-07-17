import { NextFunction, Request, Response } from 'express';
import Email from '../validations/Email';
import { ILogin } from '../Interfaces/users/IUser';
import JwtUtils from '../utils/JwtUtils';
import UserService from '../services/UserService';

class Validations {
  private static passwordMinLength = 6;
  private static userService = new UserService();

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    if (!Email.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const data = authorization.split(' ');

    try {
      const jwtUtils = new JwtUtils();
      const decoded = jwtUtils.verify(data[1]);

      res.locals.decoded = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default Validations;
