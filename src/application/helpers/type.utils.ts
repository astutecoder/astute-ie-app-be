import { Request } from 'express';

export type AtleastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type TypedRequest<ReqBodyType> = Request<{}, {}, ReqBodyType>;
