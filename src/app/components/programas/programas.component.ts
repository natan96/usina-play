import { Component, inject, OnInit, signal } from '@angular/core';
import { Programa } from 'src/app/core/models/programa';
import { ProgramaRepository } from 'src/app/core/repositories';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss'],
  standalone: false,
})
export class ProgramasComponent implements OnInit {
  private programaRepository = inject(ProgramaRepository);
  programas: Programa[] = [];
  loading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadProgramas();
  }

  private async loadProgramas() {
    this.loading.set(true);
    try {
      this.programas = await this.programaRepository.getAll();
    } catch (error) {
      console.error('Erro ao carregar programas:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
