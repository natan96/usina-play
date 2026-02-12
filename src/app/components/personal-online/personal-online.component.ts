import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { filter, Subject, take, takeUntil } from 'rxjs';
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
export class PersonalOnlineComponent implements OnInit, OnDestroy {
  private treinoRepository = inject(TreinoRepository);
  private authService = inject(AuthService);
  private modalController = inject(ModalController);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  treinos: Treino[] = [];
  loading = signal<boolean>(true);

  ngOnInit() {
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadTreinos();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.cdr.detectChanges();
    }
  }

  public async refresh(): Promise<void> {
    await this.loadTreinos();
  }

  async addNewWorkout() {
    const modal = await this.modalController.create({
      component: TreinoFormModalComponent,
      cssClass: 'fullscreen-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.success) {
      await this.loadTreinos();
    }
  }
}
