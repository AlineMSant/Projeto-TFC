import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findByQuery(q: string): Promise<IMatch[]>,
}
