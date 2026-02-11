import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { MeuCorpo } from 'src/app/core/models/user';

@Component({
  selector: 'app-meu-corpo-modal',
  templateUrl: './meu-corpo-modal.component.html',
  styleUrls: ['./meu-corpo-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class MeuCorpoModalComponent implements OnInit {
  meuCorpo?: MeuCorpo;
  alturaEmMetros = 0;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.meuCorpo) {
      this.meuCorpo = currentUser.meuCorpo;
      this.alturaEmMetros = this.meuCorpo.altura / 100;
    }
  }

  close() {
    this.modalController.dismiss();
  }

  hasCircunferencias(): boolean {
    return (
      !!this.meuCorpo?.circunferencias &&
      Object.keys(this.meuCorpo.circunferencias).length > 0
    );
  }
}
