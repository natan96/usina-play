import { BaseModel } from '../interfaces/base-model';

export interface Treino extends BaseModel {
  nome: string;
  imageUrl: string;
  userId: string;
}
