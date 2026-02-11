import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { UserLevel, UserLevelLabel } from 'src/app/core/enums/user-level.enum';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class TopbarComponent {
  private menuCtrl = inject(MenuController);

  userName = 'Leonardo Santos';
  userLevel: UserLevel = UserLevel.ROXO;
  userAvatar = 'assets/images/perfil.jpg';
  notificationCount = 3;
  userLevelLabel = UserLevelLabel;

  async openMenu() {
    await this.menuCtrl.open('main-menu');
  }

  openNotifications() {
    console.log('Notificações abertas');
  }

  openMyBody() {
    console.log('Meu corpo aberto');
  }

  openGoals() {
    console.log('Objetivos e conquistas aberto');
  }
}
