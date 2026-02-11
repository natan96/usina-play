import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Treino } from '../models/treino';
import { TreinoRepository } from '../repositories/treino.repository';

@Injectable({
  providedIn: 'root',
})
export class TreinoService {
  constructor(private treinoRepository: TreinoRepository) {}

  /**
   * Cria um novo treino
   */
  createTreino(
    treino: Omit<Treino, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Treino> {
    return from(this.treinoRepository.add(treino));
  }

  /**
   * Atualiza um treino existente
   */
  updateTreino(id: string, treino: Partial<Treino>): Observable<void> {
    return from(this.treinoRepository.update(id, treino));
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
    return from(this.treinoRepository.delete(id));
  }
}
