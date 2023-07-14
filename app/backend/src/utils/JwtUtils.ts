import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'minhasenhasecreta';

  sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}
