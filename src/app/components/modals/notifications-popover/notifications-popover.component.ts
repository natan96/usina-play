import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Notification } from 'src/app/core/models/notification';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class NotificationsPopoverComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadNotifications();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadNotifications() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.loading = false;
      return;
    }

    this.notificationService
      .getNotifications(currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar notificações:', error);
          this.loading = false;
        },
      });
  }

  async markAsRead(notification: Notification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (!notification.read) {
      try {
        await this.notificationService.markAsRead(notification.id);
      } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
      }
    }
  }

  async markAllAsRead() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    try {
      await this.notificationService.markAllAsRead(currentUser.id);
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  }

  async close() {
    await this.modalController.dismiss();
  }

  onNotificationClick(notification: Notification) {
    this.markAsRead(notification);
    // Aqui você pode adicionar navegação ou outras ações
    console.log('Notificação clicada:', notification);
  }
}
