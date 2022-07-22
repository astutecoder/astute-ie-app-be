import { IIncomeRepository } from '../../../application/repositories/IIncomeRepository';
import { CResponse, IIncome } from '../../../domain/models';
import { AtleastOne, CError } from '../../../application/helpers';
import { errorResponse } from '../../../application/helpers/errorResponse.utils';
import IncomeModel from '../../orm/mongo/Income.model';
import { Error } from 'mongoose';

export class MongoIncomeRepository extends IIncomeRepository {
  async getBySource(source: string): Promise<CResponse<IIncome[]>> {
    try {
      const incomes = await IncomeModel.find({ source });
      if (incomes.length < 1) throw new CError('Nothing found with this source', 404);
      return {
        code: 200,
        success: true,
        data: incomes,
        error: null,
      };
    } catch (error) {
      console.log('error testing', error);
      return errorResponse(error);
    }
  }

  async getByTeam(teamId: string): Promise<CResponse<IIncome[]>> {
    try {
      const incomes = await IncomeModel.find({ team: teamId });
      if (incomes.length < 1) throw new CError('No data found', 404);
      return {
        code: 200,
        success: true,
        data: incomes,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }

  async getByUser(userId: string): Promise<CResponse<IIncome[]>> {
    try {
      const incomes = await IncomeModel.find({ user: userId });
      if (incomes.length < 1) throw new CError('No data found', 404);
      return {
        code: 200,
        success: true,
        data: incomes,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }

  async getByTeamUser(teamId: string, userId: string): Promise<CResponse<IIncome[]>> {
    try {
      const incomes = await IncomeModel.find({ team: teamId, user: userId });
      if (incomes.length < 1) throw new CError('No data found', 404);
      return {
        code: 200,
        success: true,
        data: incomes,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }

  async add(data: IIncome): Promise<CResponse<string>> {
    try {
      const income = new IncomeModel(data);
      await income.save();
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

  async get(): Promise<CResponse<IIncome[]>> {
    try {
      const incomes = await IncomeModel.find();
      if (incomes.length < 1) throw new CError('No data found', 404);
      return {
        code: 200,
        success: true,
        data: incomes,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }

  async update(id: string, data: AtleastOne<IIncome>): Promise<CResponse<IIncome>> {
    try {
      const income = await IncomeModel.findById(id);
      if (!income) throw new CError('No data found to update', 404);

      Object.assign(income, data);
      await income.save();

      return {
        code: 200,
        success: true,
        data: income,
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }

  async delete(id: string): Promise<CResponse<string>> {
    try {
      const deleted = await IncomeModel.findByIdAndDelete(id);
      if (!deleted) throw new CError('No data found to delete', 404);

      return {
        code: 200,
        success: true,
        data: 'successfully deleted',
        error: null,
      };
    } catch (error) {
      return errorResponse(error);
    }
  }
}
