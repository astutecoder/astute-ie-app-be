import { ITeamRepository } from '../../application/repositories/ITeamRepository';
import { ITeamService } from '../../application/services/ITeamService';
import { ITeam, CResponse } from '../../domain/models';

export class TeamService extends ITeamService {
  constructor(private _teamRespository: ITeamRepository) {
    super();
  }

  add = async (data: ITeam): Promise<CResponse<string>> => {
    try {
      return await this._teamRespository.add(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getAll = async (): Promise<CResponse<ITeam[]>> => {
    try {
      return await this._teamRespository.get();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id: string): Promise<CResponse<ITeam>> => {
    throw new Error('method not implemented');
  };
  
  getByName = async (name: string): Promise<CResponse<ITeam>> => {
    throw new Error('method not implemented');
  };
}
