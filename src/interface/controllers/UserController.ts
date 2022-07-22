import { NextFunction, Request, Response } from 'express';
import { CResponse, IUser } from '../../domain/models';
import { IUserService } from '../../application/services/IUserService';

export class UserController {
  constructor(private _userService: IUserService) {}

  getAll = async (req: Request, res: Response<CResponse<IUser[]>>, next: NextFunction) => {
    try {
      const users = await this._userService.getUsers();
      return res.json(users);
    } catch (error) {
      console.error('[UserController GET]', error);
      next(error);
    }
  };

  addUser = async (req: Request<{}, {}, IUser>, res: Response<CResponse<string>>, next: NextFunction) => {
    const { firstName, lastName, email, password, team } = req.body;
    try {
      const response = await this._userService.addUser({
        firstName,
        lastName,
        email,
        password,
        team,
      });

      res.json(response);
    } catch (error) {
      console.error('[UserController]', error);
      next(error);
    }
  };
}
