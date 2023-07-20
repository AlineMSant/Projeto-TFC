import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ILeaderboard } from '../Interfaces/learderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { sumTotalsHome, sumTotalsAway } from '../utils/LeaderboardUtils';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);

    return leaderboard;
  }

  public async findAllHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const searchAllNotInProgress = await this.matchModel.search('false');

    const arrayMatchesByTeamId = allTeams.map((team) => searchAllNotInProgress
      .filter((match) => match.homeTeamId === team.id));

    const totals = sumTotalsHome(arrayMatchesByTeamId, allTeams);

    const result = LeaderboardService.sortLeaderboard(totals);

    return { status: 'SUCCESSFUL', data: result };
  }

  public async findAllAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const searchAllNotInProgress = await this.matchModel.search('false');

    const arrayMatchesByTeamId = allTeams.map((team) => searchAllNotInProgress
      .filter((match) => match.awayTeamId === team.id));

    const totals = sumTotalsAway(arrayMatchesByTeamId, allTeams);

    const result = LeaderboardService.sortLeaderboard(totals);

    return { status: 'SUCCESSFUL', data: result };
  }
}
