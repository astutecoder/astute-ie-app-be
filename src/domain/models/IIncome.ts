import { ITeam } from './ITeam';
import { IUser } from './IUser';

export interface IIncome {
  amount: number;
  source: string;
  user: IUser;
  team: ITeam;
}
