import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private menuCtrl = inject(MenuController);
  private router = inject(Router);
  private platform = inject(Platform);

  async ngOnInit() {
    await this.platform.ready();

    // Configurar status bar para dispositivos mobile
    if (this.platform.is('capacitor')) {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#202020' });
        await StatusBar.setOverlaysWebView({ overlay: false });
      } catch (error) {
        console.error('Erro ao configurar status bar:', error);
      }
    }
  }

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
