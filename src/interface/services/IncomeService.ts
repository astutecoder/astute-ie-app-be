import { IIncomeRepository } from '../../application/repositories/IIncomeRepository';
import { IIncomeService } from '../../application/services/IIncomeService';
import { IIncome, CResponse } from '../../domain/models';
import { AtleastOne } from '../../application/helpers';

export class IncomeService extends IIncomeService {
  constructor(private _incomeRepository: IIncomeRepository) {
    super();
  }

  add = async (data: IIncome): Promise<CResponse<string>> => await this._incomeRepository.add(data);

  get = async (): Promise<CResponse<IIncome[]>> => await this._incomeRepository.get();

  getBySource = async (source: string): Promise<CResponse<IIncome[]>> =>
    await this._incomeRepository.getBySource(source);

  getByTeam = async (teamId: string): Promise<CResponse<IIncome[]>> => await this._incomeRepository.getByTeam(teamId);

  getByUser = async (userId: string): Promise<CResponse<IIncome[]>> => await this._incomeRepository.getByUser(userId);

  getByTeamUser = async (teamId: string, userId: string): Promise<CResponse<IIncome[]>> =>
    await this._incomeRepository.getByTeamUser(teamId, userId);

  update = async (id: string, data: AtleastOne<IIncome>): Promise<CResponse<IIncome>> =>
    await this._incomeRepository.update(id, data);

  delete = async (id: string): Promise<CResponse<string>> => await this._incomeRepository.delete(id);
}
