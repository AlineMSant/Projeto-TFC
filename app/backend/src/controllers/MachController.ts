import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.finishMatches(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
