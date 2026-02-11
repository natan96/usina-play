import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Objetivo } from 'src/app/core/models/user';

@Component({
  selector: 'app-objetivos-modal',
  templateUrl: './objetivos-modal.component.html',
  styleUrls: ['./objetivos-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ObjetivosModalComponent implements OnInit {
  objetivos?: Objetivo[];

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.objetivos) {
      this.objetivos = currentUser.objetivos;
    }
  }

  close() {
    this.modalController.dismiss();
  }

  hasObjetivos(): boolean {
    return !!this.objetivos && this.objetivos.length > 0;
  }
}
