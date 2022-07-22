import { CResponse, IIncome } from '../../domain/models';
import { AtleastOne } from '../helpers';

export abstract class IIncomeService {
  abstract add: (data: IIncome) => Promise<CResponse<string>>;

  abstract get: () => Promise<CResponse<IIncome[]>>;

  abstract getBySource: (source: string) => Promise<CResponse<IIncome[]>>;

  abstract getByTeam: (teamId: string) => Promise<CResponse<IIncome[]>>;

  abstract getByUser: (userId: string) => Promise<CResponse<IIncome[]>>;

  abstract getByTeamUser: (teamId: string, userId: string) => Promise<CResponse<IIncome[]>>;

  abstract update: (id: string, data: AtleastOne<IIncome>) => Promise<CResponse<IIncome>>;

  abstract delete: (id: string) => Promise<CResponse<string>>;
}
