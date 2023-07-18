import { IMatch } from './IMatch';
import { NewEntity } from '..';
import { ServiceMessage } from '../ServiceResponse';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  search(q: string): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>
  update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null>,
  create(data: Partial<IMatch>): Promise<IMatch | ServiceMessage>,
}
