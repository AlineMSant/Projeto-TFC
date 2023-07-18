import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { NewEntity } from '../Interfaces';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async search(q: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatchesBySearch = await this.matchModel.search(q);
    return { status: 'SUCCESSFUL', data: allMatchesBySearch };
  }

  public async finishMatches(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const finishedMatch = { inProgress: false };

    const updatedMatch = await this.matchModel.update(id, finishedMatch);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const updateData = {
      homeTeamGoals,
      awayTeamGoals };

    const updatedMatch = await this.matchModel.update(id, updateData);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async create(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch | ServiceMessage>> {
    const homeTeamFound = await this.matchModel.findById(match.homeTeamId);
    const awayTeamFound = await this.matchModel.findById(match.awayTeamId);

    if (!homeTeamFound || !awayTeamFound) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newData = {
      ...match,
      inProgress: true,
    };

    const newMatch = await this.matchModel.create(newData);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
