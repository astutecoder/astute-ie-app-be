import { Error } from 'mongoose';
import { CResponse } from '../../domain/models';
import { CError } from './error.utils';

export const errorResponse = (error: any) => {
  if (error instanceof Error) {
    console.error('[Mongo Error]', error);
    const mongoError = new CError('Something went wrong', 500);
    return new CResponse(mongoError.status, false, mongoError.message, mongoError as any);
  }
  return new CResponse(error.status, false, error.message, error);
};
