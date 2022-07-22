import { NextFunction, Response, Request } from 'express';
import { ITeamService } from '../../application/services/ITeamService';
import { CResponse, ITeam } from '../../domain/models';
import { TypedRequest } from '../../application/helpers';

export class TeamController {
  constructor(private _teamService: ITeamService) {}

  getAll = async (req: Request, res: Response<CResponse<ITeam[]>>, next: NextFunction) => {
    try {
      const teams = await this._teamService.getAll();
      return res.json(teams);
    } catch (error) {
      console.error('[TeamController]', error);
      next(error);
    }
  };

  addTeam = async (req: TypedRequest<ITeam>, res: Response<CResponse<string>>, next: NextFunction) => {
    try {
      const { name } = req.body;
      const response = await this._teamService.add({ name });
      res.json(response);
    } catch (error) {
      console.error('[TeamController]', error);
      next(error);
    }
  };
}
