import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  /**
   * Observa todas as notificações de um usuário em tempo real
   */
  getNotifications(userId: string): Observable<Notification[]> {
    return this.notificationRepository.getByUserIdAsync(userId);
  }

  /**
   * Observa notificações não lidas de um usuário em tempo real
   */
  getUnreadNotifications(userId: string): Observable<Notification[]> {
    return this.notificationRepository.getUnreadByUserIdAsync(userId);
  }

  /**
   * Marca uma notificação como lida
   */
  async markAsRead(notificationId: string): Promise<void> {
    await this.notificationRepository.markAsRead(notificationId);
  }

  /**
   * Marca todas as notificações de um usuário como lidas
   */
  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  /**
   * Cria uma nova notificação para um usuário
   */
  async createNotification(
    userId: string,
    title: string,
    message: string
  ): Promise<Notification> {
    return await this.notificationRepository.add({
      userId,
      title,
      message,
      read: false,
    });
  }
}
