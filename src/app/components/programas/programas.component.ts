import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { Programa } from 'src/app/core/models/programa';
import { ProgramaRepository } from 'src/app/core/repositories';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss'],
  standalone: false,
})
export class ProgramasComponent implements OnInit, OnDestroy {
  private programaRepository = inject(ProgramaRepository);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  programas: Programa[] = [];
  loading = signal<boolean>(true);

  ngOnInit() {
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadProgramas();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadProgramas() {
    this.loading.set(true);
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.programas = await this.programaRepository.getByField(
          'userId',
          currentUser.id
        );
      }
    } catch (error) {
      console.error('Erro ao carregar programas:', error);
    } finally {
      this.loading.set(false);
      this.cdr.detectChanges();
    }
  }
}
