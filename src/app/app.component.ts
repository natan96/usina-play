import { Component, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private menuCtrl = inject(MenuController);

  navigateTo(_page: string) {
    this.close();
  }

  logout() {
    this.close();
  }

  close() {
    this.menuCtrl.close('main-menu');
  }
}
