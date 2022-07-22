import { Error } from 'mongoose';
import { CResponse, IUser } from '../../../domain/models';
import { IUserRepository } from '../../../application/repositories/IUserRepository';
import UserModel from '../../orm/mongo/User.model';
import { AtleastOne } from '../../../application/helpers';
import { errorResponse } from '../../../application/helpers/errorResponse.utils';

export class MongoUserRepository extends IUserRepository {
  async add(data: IUser): Promise<CResponse<string>> {
    try {
      const user = new UserModel(data);
      await user.save();
      return {
        code: 201,
        success: true,
        data: 'User added successfully',
        error: null,
      };
    } catch (error) {
      console.error('[MongoUserRepository]', error);
      return errorResponse(error);
    }
  }

  async get(): Promise<CResponse<IUser[]>> {
    try {
      const users = await UserModel.find();
      return {
        code: 200,
        success: true,
        data: users,
        error: null,
      };
    } catch (error) {
      console.error('[MongoUserRepository]', error);
      return errorResponse(error);
    }
  }

  async getByEmail(email: string): Promise<CResponse<IUser>> {
    try {
      const users = await UserModel.findOne({ email });
      return {
        code: 200,
        success: true,
        data: users,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }

  getByTeam(team: string): Promise<CResponse<IUser[]>> {
    throw new Error('Method not implemented.');
  }

  update(id: string, data: AtleastOne<IUser>): Promise<CResponse<IUser>> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<CResponse<string>> {
    throw new Error('Method not implemented.');
  }
}
