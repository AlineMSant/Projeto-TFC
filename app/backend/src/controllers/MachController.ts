import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllTeams(req: Request, res: Response) {
    const inProgress = req.query.inProgress as string;

    if (inProgress) {
      const serviceResponseSearch = await this.matchService.search(inProgress);
      return res.status(200).json(serviceResponseSearch.data);
    }

    const serviceResponse = await this.matchService.getAllMatches();
    return res.status(200).json(serviceResponse.data);
  }
}
