import Match from '../database/models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = Match;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll();
    return dbData.map((matches) => (
      matches
    ));
  }
}
