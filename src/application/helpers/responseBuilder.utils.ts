import { Response } from 'express';
import { CResponse } from '../../domain/models';

export const sendResponse = <T>(res: Response, data: CResponse<T>): void => {
  res.status(data.code).json(data);
};
