import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async search(q: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatchesBySearch = await this.matchModel.findByQuery(q);
    return { status: 'SUCCESSFUL', data: allMatchesBySearch };
  }
}
