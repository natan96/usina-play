import { BaseModel } from '../interfaces/base-model';

export interface Circunferencias {
  cintura?: number;
  quadril?: number;
  busto?: number;
  pescoco?: number;
  biceps?: number;
  panturrilha?: number;
  coxa?: number;
}

export interface MeuCorpo {
  peso: number;
  altura: number;
  percentualGordura?: number;
  circunferencias?: Circunferencias;
}

export interface Objetivo {
  objetivo: string;
  conquistado: boolean;
}

export interface User extends BaseModel {
  nome: string;
  email: string;
  userLevel: string;
  avatar: string;
  lastAccess: Date;
  meuCorpo?: MeuCorpo;
  objetivos?: Objetivo[];
}
