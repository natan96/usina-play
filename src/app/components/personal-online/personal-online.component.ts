import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Treino } from 'src/app/core/models/treino';
import { TreinoRepository } from 'src/app/core/repositories';
import { AuthService } from 'src/app/core/services/auth.service';
import { TreinoFormModalComponent } from '../modals/treino-form-modal/treino-form-modal.component';

@Component({
  selector: 'app-personal-online',
  templateUrl: './personal-online.component.html',
  styleUrls: ['./personal-online.component.scss'],
  standalone: false,
})
export class PersonalOnlineComponent implements OnInit {
  private treinoRepository = inject(TreinoRepository);
  private authService = inject(AuthService);
  private modalController = inject(ModalController);
  treinos: Treino[] = [];
  loading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadTreinos();
  }

  private async loadTreinos() {
    this.loading.set(true);
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.treinos = await this.treinoRepository.getByField(
          'userId',
          currentUser.id
        );
      }
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async addNewWorkout() {
    const modal = await this.modalController.create({
      component: TreinoFormModalComponent,
      cssClass: 'fullscreen-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    // Recarrega a lista se o treino foi criado com sucesso
    if (data?.success) {
      await this.loadTreinos();
    }
  }
}
