import { CResponse, IUser } from '../../domain/models';
import { IUserRepository } from '../../application/repositories/IUserRepository';
import { IUserService } from '../../application/services/IUserService';

export class UserService extends IUserService {
  constructor(private _userRepository: IUserRepository) {
    super();
  }
  getUsers = async () => {
    try {
      return await this._userRepository.get();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addUser = async (data: IUser) => {
    try {
      return await this._userRepository.add(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
