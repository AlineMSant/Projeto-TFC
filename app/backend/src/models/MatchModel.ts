import Match from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private model = Match;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return dbData.map((matches) => (
      matches
    ));
  }

  async findByQuery(q: string): Promise<IMatch[]> {
    // conforme mentoria, aqui é tranformado em boolean automaticamente para poder retornar corretamente
    const bool = q === 'true';

    const dbData = await this.model.findAll({
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: bool },
    });
    return dbData.map((matches) => (
      matches
    ));
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }
}
