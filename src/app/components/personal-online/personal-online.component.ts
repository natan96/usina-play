import { Component, inject, OnInit, signal } from '@angular/core';
import { Treino } from 'src/app/core/models/treino';
import { TreinoRepository } from 'src/app/core/repositories';

@Component({
  selector: 'app-personal-online',
  templateUrl: './personal-online.component.html',
  styleUrls: ['./personal-online.component.scss'],
  standalone: false,
})
export class PersonalOnlineComponent implements OnInit {
  private treinoRepository = inject(TreinoRepository);
  treinos: Treino[] = [];
  loading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadTreinos();
  }

  private async loadTreinos() {
    this.loading.set(true);
    try {
      this.treinos = await this.treinoRepository.getAll();
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  addNewWorkout() {
    console.log('Novo treino');
  }
}
