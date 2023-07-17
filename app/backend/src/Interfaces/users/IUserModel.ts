import { IUser } from './IUser';

export interface IUserModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
  findById(id: IUser['id']): Promise<IUser | null>,
}
