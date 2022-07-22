import { ITeam, CResponse } from '../../domain/models';
import { IRepository } from './IRepository';

export abstract class ITeamRepository extends IRepository<ITeam> {
  abstract getByName(name: string): Promise<CResponse<ITeam>>;
}
