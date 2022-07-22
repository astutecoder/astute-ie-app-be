import { ITeam } from './ITeam';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  team: ITeam;
}
