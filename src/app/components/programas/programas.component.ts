import { Component, inject, OnInit, signal } from '@angular/core';
import { Programa } from 'src/app/core/models/programa';
import { ProgramaRepository } from 'src/app/core/repositories';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss'],
  standalone: false,
})
export class ProgramasComponent implements OnInit {
  private programaRepository = inject(ProgramaRepository);
  private authService = inject(AuthService);
  programas: Programa[] = [];
  loading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadProgramas();
  }

  private async loadProgramas() {
    this.loading.set(true);
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.programas = await this.programaRepository.getByField('userId', currentUser.id);
      }
    } catch (error) {
      console.error('Erro ao carregar programas:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
