import { IIncome, CResponse } from '../../domain/models';
import { IRepository } from './IRepository';

export abstract class IIncomeRepository extends IRepository<IIncome> {
  abstract getBySource(source: string): Promise<CResponse<IIncome[]>>;
  abstract getByTeam(teamId: string): Promise<CResponse<IIncome[]>>;
  abstract getByUser(userId: string): Promise<CResponse<IIncome[]>>;
  abstract getByTeamUser(teamId: string, userId: string): Promise<CResponse<IIncome[]>>;
}
