import Model from '../database/models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = Model;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(idTeam: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(idTeam);

    if (dbData == null) return null;

    const { id, teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
