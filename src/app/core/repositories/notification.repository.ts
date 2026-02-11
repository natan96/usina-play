import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import {
    collection,
    Firestore,
    onSnapshot,
    query,
    where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { FirebaseAbstractRepository } from './firebase-abstract.repository';

@Injectable({
  providedIn: 'root',
})
export class NotificationRepository extends FirebaseAbstractRepository<Notification> {
  protected collectionName = 'notifications';

  constructor(firestore: Firestore, injector: Injector) {
    super(firestore, injector);
  }

  /**
   * Observa notificações de um usuário em tempo real
   */
  getByUserIdAsync(userId: string): Observable<Notification[]> {
    return new Observable((observer) => {
      return runInInjectionContext(this.injector, () => {
        const collectionRef = collection(this.firestore, this.collectionName);
        const q = query(collectionRef, where('userId', '==', userId));

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const notifications = querySnapshot.docs
              .map((doc) => this.convertToModel(doc.id, doc.data()))
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            observer.next(notifications);
          },
          (error) => {
            console.error('Erro ao observar notificações:', error);
            observer.error(error);
          }
        );

        return () => unsubscribe();
      });
    });
  }

  /**
   * Observa notificações não lidas de um usuário em tempo real
   */
  getUnreadByUserIdAsync(userId: string): Observable<Notification[]> {
    return new Observable((observer) => {
      return runInInjectionContext(this.injector, () => {
        const collectionRef = collection(this.firestore, this.collectionName);
        const q = query(
          collectionRef,
          where('userId', '==', userId),
          where('read', '==', false)
        );

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const notifications = querySnapshot.docs
              .map((doc) => this.convertToModel(doc.id, doc.data()))
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            observer.next(notifications);
          },
          (error) => {
            console.error('Erro ao observar notificações não lidas:', error);
            observer.error(error);
          }
        );

        return () => unsubscribe();
      });
    });
  }

  /**
   * Marca uma notificação como lida
   */
  async markAsRead(notificationId: string): Promise<void> {
    await this.update(notificationId, { read: true } as Partial<Notification>);
  }

  /**
   * Marca todas as notificações de um usuário como lidas
   */
  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.getByField('userId', userId);
    const unreadNotifications = notifications.filter((n) => !n.read);

    await Promise.all(
      unreadNotifications.map((notification) =>
        this.markAsRead(notification.id)
      )
    );
  }
}
