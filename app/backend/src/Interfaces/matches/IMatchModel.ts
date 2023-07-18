import { IMatch } from './IMatch';
import { NewEntity } from '..';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  search(q: string): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>
  update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null>,
}
