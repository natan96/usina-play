import { BaseModel } from '../interfaces/base-model';

export interface User extends BaseModel {
  nome: string;
  email: string;
  userLevel: string;
  avatar: string;
  lastAccess: Date;
}
