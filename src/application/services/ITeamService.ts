import { CResponse, ITeam } from '../../domain/models';

export abstract class ITeamService {
  abstract add: (data: ITeam) => Promise<CResponse<string>>;
  abstract getAll: () => Promise<CResponse<ITeam[]>>;
  abstract getById: (id: string) => Promise<CResponse<ITeam>>;
  abstract getByName: (name: string) => Promise<CResponse<ITeam>>;
}
