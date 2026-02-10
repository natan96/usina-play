import { BaseModel } from '../interfaces/base-model';

export interface Programa extends BaseModel {
  nome: string;
  imageUrl: string;
  started?: boolean;
}
