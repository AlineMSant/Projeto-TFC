import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async findAllHome(req: Request, res: Response) {
    const serviceResponseSearch = await this.leaderboardService.findAllHome();
    return res.status(200).json(serviceResponseSearch.data);
  }

  public async findAllAway(req: Request, res: Response) {
    const serviceResponseSearch = await this.leaderboardService.findAllAway();
    return res.status(200).json(serviceResponseSearch.data);
  }

  public async findAll(req: Request, res: Response) {
    const serviceResponseSearch = await this.leaderboardService.findAll();
    return res.status(200).json(serviceResponseSearch.data);
  }
}
