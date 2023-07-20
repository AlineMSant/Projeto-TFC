import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ILeaderboard } from '../Interfaces/learderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import sumTotals from '../utils/LeaderboardUtils';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async findAllHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const searchAllNotInProgress = await this.matchModel.search('false');

    const arrayMatchesByTeamId = allTeams.map((team) => searchAllNotInProgress
      .filter((match) => match.homeTeamId === team.id));

    const totals = sumTotals(arrayMatchesByTeamId, allTeams);

    return { status: 'SUCCESSFUL', data: totals };
  }
}
