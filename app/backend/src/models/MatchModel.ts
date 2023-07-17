import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = Match;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return dbData.map((matches) => (
      matches
    ));
  }
}
