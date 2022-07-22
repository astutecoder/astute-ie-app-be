import { AtleastOne } from '../helpers';
import { CResponse } from '../../domain/models';

export abstract class IRepository<ServiceType> {
  abstract add(data: ServiceType): Promise<CResponse<string>>;

  abstract get(): Promise<CResponse<ServiceType[]>>;

  abstract update(id: string, data: AtleastOne<ServiceType>): Promise<CResponse<ServiceType>>;

  abstract delete(id: string): Promise<CResponse<string>>;
}
