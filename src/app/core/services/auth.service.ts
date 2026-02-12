import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserRepository } from '../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'current_user';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private userRepository: UserRepository) {
    this.loadUserFromStorage();
  }

  /**
   * Carrega o usuário do Local Storage ou busca o primeiro usuário
   */
  private async loadUserFromStorage(): Promise<void> {
    try {
      const storedUser = localStorage.getItem(this.STORAGE_KEY);

      if (storedUser) {
        const user: User = JSON.parse(storedUser);

        user.createdAt = new Date(user.createdAt);
        user.updatedAt = user.updatedAt ? new Date(user.updatedAt) : null;
        user.lastAccess = new Date(user.lastAccess);

        this.currentUserSubject.next(user);
        await this.updateLastAccess(user.id);
      } else {
        await this.loadFirstUser();
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do storage:', error);
      await this.loadFirstUser();
    }
  }

  /**
   * Busca o primeiro usuário do banco de dados
   */
  private async loadFirstUser(): Promise<void> {
    try {
      const users = await this.userRepository.getWithLimit(1);
      if (users.length > 0) {
        await this.setCurrentUser(users[0]);
      } else {
        console.warn('Nenhum usuário encontrado no banco de dados');
      }
    } catch (error) {
      console.error('Erro ao buscar primeiro usuário:', error);
    }
  }

  /**
   * Define o usuário atual e salva no Local Storage
   */
  async setCurrentUser(user: User): Promise<void> {
    try {
      const updatedUser = { ...user, lastAccess: new Date() };
      await this.userRepository.update(user.id, {
        lastAccess: updatedUser.lastAccess,
      });

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
    } catch (error) {
      console.error('Erro ao definir usuário atual:', error);
      throw error;
    }
  }

  /**
   * Atualiza o último acesso do usuário
   */
  private async updateLastAccess(userId: string): Promise<void> {
    try {
      const now = new Date();
      await this.userRepository.update(userId, { lastAccess: now });

      const currentUser = this.currentUserSubject.value;
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, lastAccess: now };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
      }
    } catch (error) {
      console.error('Erro ao atualizar último acesso:', error);
    }
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Faz logout do usuário
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Verifica se há um usuário logado
   */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
