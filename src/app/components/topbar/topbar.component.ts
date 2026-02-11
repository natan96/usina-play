import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { UserLevelLabel } from 'src/app/core/enums/user-level.enum';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NotificationsPopoverComponent } from '../modals/notifications-popover/notifications-popover.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class TopbarComponent implements OnInit, OnDestroy {
  private menuCtrl = inject(MenuController);
  private modalCtrl = inject(ModalController);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  notificationCount = 0;
  userLevelLabel = UserLevelLabel;

  private destroy$ = new Subject<void>();
  currentUser: User | null = null;

  ngOnInit() {
    this.loadUser();
    this.loadNotificationCount();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUser() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  private loadNotificationCount() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.notificationService
            .getUnreadNotifications(user.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((notifications) => {
              this.notificationCount = notifications.length;
            });
        }
      });
  }

  async openMenu() {
    await this.menuCtrl.open('main-menu');
  }

  async openNotifications(event: Event) {
    const modal = await this.modalCtrl.create({
      component: NotificationsPopoverComponent,
      cssClass: 'notifications-modal',
      backdropDismiss: true,
      showBackdrop: true,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });

    await modal.present();
  }

  openMyBody() {
    console.log('Meu corpo aberto');
  }

  openGoals() {
    console.log('Objetivos e conquistas aberto');
  }
}
