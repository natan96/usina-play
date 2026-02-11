import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private menuCtrl = inject(MenuController);
  private router = inject(Router);

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.close();
  }

  logout() {
    this.close();
  }

  close() {
    this.menuCtrl.close('main-menu');
  }
}
