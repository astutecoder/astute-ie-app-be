import { CResponse, IUser } from '../../domain/models';
import { IRepository } from './IRepository';

export abstract class IUserRepository extends IRepository<IUser> {
  abstract getByEmail(email: string): Promise<CResponse<IUser>>;
  abstract getByTeam(team: string): Promise<CResponse<IUser[]>>;
}
