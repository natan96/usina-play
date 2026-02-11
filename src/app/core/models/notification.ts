import { BaseModel } from '../interfaces/base-model';

export interface Notification extends BaseModel {
  title: string;
  message: string;
  read: boolean;
  userId: string;
}
