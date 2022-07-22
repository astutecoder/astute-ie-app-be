import { CResponse, IUser } from '../../domain/models';

export abstract class IUserService {
  abstract getUsers: () => Promise<CResponse<IUser[]>>;
  abstract addUser: (data: IUser) => Promise<CResponse<string>>;
}
