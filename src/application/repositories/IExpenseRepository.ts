import { IExpense, CResponse } from '../../domain/models';
import { IRepository } from './IRepository';

export abstract class IExpenseRepository extends IRepository<IExpense> {
  abstract getByTeam(teamId: string): Promise<CResponse<IExpense[]>>;
  abstract getByUser(userId: string): Promise<CResponse<IExpense[]>>;
  abstract getByTeamUser(teamId: string, userId: string): Promise<CResponse<IExpense[]>>;
}
