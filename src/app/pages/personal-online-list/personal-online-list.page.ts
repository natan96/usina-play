import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  IonicModule,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { TreinoFormModalComponent } from 'src/app/components/modals/treino-form-modal/treino-form-modal.component';
import { Treino } from 'src/app/core/models/treino';
import { AuthService } from 'src/app/core/services/auth.service';
import { TreinoService } from 'src/app/core/services/treino.service';

@Component({
  selector: 'app-personal-online-list',
  templateUrl: './personal-online-list.page.html',
  styleUrls: ['./personal-online-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PersonalOnlineListPage implements OnInit {
  treinos: Treino[] = [];
  loading = true;

  constructor(
    private treinoService: TreinoService,
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadTreinos();
  }

  ionViewWillEnter() {
    this.loadTreinos();
  }

  async loadTreinos() {
    this.loading = true;
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.treinos = await this.treinoService.getTreinosByUserId(
          currentUser.id
        );
      }
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      await this.showErrorToast('Erro ao carregar treinos');
    } finally {
      this.loading = false;
    }
  }

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: TreinoFormModalComponent,
      cssClass: 'fullscreen-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.success) {
        this.loadTreinos();
      }
    });

    await modal.present();
  }

  async openEditModal(treino: Treino) {
    const modal = await this.modalController.create({
      component: TreinoFormModalComponent,
      cssClass: 'fullscreen-modal',
      componentProps: {
        treinoId: treino.id,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.success) {
        this.loadTreinos();
      }
    });

    await modal.present();
  }

  async confirmDelete(treino: Treino) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclus\u00e3o',
      message: `Deseja realmente excluir o treino "${treino.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteTreino(treino.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteTreino(id: string) {
    try {
      await this.treinoService.deleteTreino(id).toPromise();
      await this.showSuccessToast('Treino exclu\u00eddo com sucesso!');
      this.loadTreinos();
    } catch (error) {
      console.error('Erro ao excluir treino:', error);
      await this.showErrorToast('Erro ao excluir treino');
    }
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }
}
