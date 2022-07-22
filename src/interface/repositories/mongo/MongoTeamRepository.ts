import { CResponse, ITeam } from '../../../domain/models';
import { ITeamRepository } from '../../../application/repositories/ITeamRepository';
import TeamModel from '../../orm/mongo/Team.model';
import { errorResponse } from '../../../application/helpers/errorResponse.utils';
import { AtleastOne } from '../../../application/helpers';

export class MongoTeamRepository extends ITeamRepository {
  async getByName(name: string): Promise<CResponse<ITeam>> {
    try {
      const team = await TeamModel.findOne({ name });
      return {
        code: 200,
        success: true,
        data: team,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }
  async add(data: ITeam): Promise<CResponse<string>> {
    try {
      const team = new TeamModel(data);
      await team.save();
      return {
        code: 201,
        success: true,
        data: 'successfully added',
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }
  async get(): Promise<CResponse<ITeam[]>> {
    try {
      const teams = await TeamModel.find();
      return {
        code: 200,
        success: true,
        data: teams,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }
  async update(id: string, data: AtleastOne<ITeam>): Promise<CResponse<ITeam>> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<CResponse<string>> {
    throw new Error('Method not implemented.');
  }
}
