import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Treino } from '../models/treino';
import { TreinoRepository } from '../repositories/treino.repository';

@Injectable({
  providedIn: 'root',
})
export class TreinoService {
  private treinoChangedSubject = new Subject<void>();
  treinoChanged$ = this.treinoChangedSubject.asObservable();

  constructor(private treinoRepository: TreinoRepository) {}

  /**
   * Cria um novo treino
   */
  createTreino(
    treino: Omit<Treino, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Treino> {
    return from(this.treinoRepository.add(treino)).pipe(
      tap(() => this.treinoChangedSubject.next())
    );
  }

  /**
   * Atualiza um treino existente
   */
  updateTreino(id: string, treino: Partial<Treino>): Observable<void> {
    return from(this.treinoRepository.update(id, treino)).pipe(
      tap(() => this.treinoChangedSubject.next())
    );
  }

  /**
   * Busca um treino por ID
   */
  getTreinoById(id: string): Observable<Treino | null> {
    return from(this.treinoRepository.getById(id));
  }

  /**
   * Lista todos os treinos
   */
  getAllTreinos(): Observable<Treino[]> {
    return from(this.treinoRepository.getAll());
  }

  /**
   * Lista treinos por userId
   */
  async getTreinosByUserId(userId: string): Promise<Treino[]> {
    return this.treinoRepository.getByField('userId', userId);
  }

  /**
   * Deleta um treino
   */
  deleteTreino(id: string): Observable<void> {
    return from(this.treinoRepository.delete(id)).pipe(
      tap(() => this.treinoChangedSubject.next())
    );
  }
}
