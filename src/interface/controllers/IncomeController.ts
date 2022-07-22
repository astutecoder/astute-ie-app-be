import { NextFunction, Request, Response } from 'express';
import { IIncomeService } from '../../application/services/IIncomeService';
import { CResponse, IIncome } from '../../domain/models';
import { AtleastOne, CError, TypedRequest } from '../../application/helpers';
import { sendResponse } from '../../application/helpers/responseBuilder.utils';
import { errorResponse } from '../../application/helpers/errorResponse.utils';

const filterValues = ['source', 'user', 'team', 'team_user'] as const;
type FilterType = typeof filterValues[number];

type FilterBySourceType = {
  filter: 'source';
  source: string;
};
type FilterByUserType = {
  filter: 'user';
  userId: string;
};
type FilterByTeamType = {
  filter: 'team';
  teamId: string;
};
type FilterByTeamUserType = {
  filter: 'team_user';
  teamId: string;
  userId: string;
};

type FilterArgsType = {
  source: Omit<FilterBySourceType, 'filter'>;
  user: Omit<FilterByUserType, 'filter'>;
  team: Omit<FilterByTeamType, 'filter'>;
  team_user: Omit<FilterByTeamUserType, 'filter'>;
};

type GetQueryParamsType = FilterBySourceType | FilterByTeamType | FilterByUserType | FilterByTeamUserType | undefined;

export class IncomeController {
  constructor(private _incomeService: IIncomeService) {}

  addIncome = async (req: TypedRequest<IIncome>, res: Response<CResponse<string>>, next: NextFunction) => {
    try {
      const { amount, source, team, user } = req.body;
      const response = await this._incomeService.add({ amount, source, team, user });

      return sendResponse(res, response);
    } catch (error) {
      next(error);
    }
  };

  get = async (
    req: Request<{}, {}, {}, GetQueryParamsType>,
    res: Response<CResponse<IIncome[]>>,
    next: NextFunction
  ) => {
    const query = req.query;
    if (!query || (typeof query === 'object' && Object.keys(query).length < 1)) {
      return this.getAll(req as any, res, next);
    }

    try {
      let response: CResponse<IIncome[]>;
      let { filter, ...args } = query;

      if (!filter || !filterValues.includes(filter)) {
        throw new CError('Not valid request', 400);
      }

      const filterIncome = new FilterIncomes(this._incomeService);
      await filterIncome.filter(filter, args);
      response = filterIncome.response;

      return sendResponse(res, response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response<CResponse<IIncome[]>>, next: NextFunction) => {
    try {
      const response = await this._incomeService.get();
      return sendResponse(res, response);
    } catch (error) {
      console.error('[IncomeController]', error);
      next(error);
    }
  };

  update = async (
    req: Request<{ id: string }, {}, AtleastOne<IIncome>>,
    res: Response<CResponse<IIncome[]>>,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const { id } = req.params;
      const updatedIncome = await this._incomeService.update(id, data);
      return sendResponse(res, updatedIncome);
    } catch (error) {
      console.error('[IncomeController]', error);
      next(error);
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const response = await this._incomeService.delete(req.params.id);
      return sendResponse(res, response);
    } catch (error) {
      console.error('[IncomeController]', error);
      next(error);
    }
  };
}

class FilterIncomes {
  private _response: CResponse<IIncome[]> = { code: 0, success: false, data: [], error: null };

  constructor(private _incomeService: IIncomeService) {}

  get response() {
    return this._response;
  }

  filter = async (filter: FilterType, args: FilterArgsType[FilterType]) => {
    await this[filter](args as any);
  };

  private source = async ({ source }: FilterArgsType['source']) => {
    this._response = await this._incomeService.getBySource(source);
  };

  private team = async ({ teamId }: FilterArgsType['team']) => {
    this._response = await this._incomeService.getByTeam(teamId);
  };

  private user = async ({ userId }: FilterArgsType['user']) => {
    this._response = await this._incomeService.getByUser(userId);
  };

  private team_user = async ({ teamId, userId }: FilterArgsType['team_user']) => {
    this._response = await this._incomeService.getByTeamUser(teamId, userId);
  };
}
