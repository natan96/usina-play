import { Injector, runInInjectionContext } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { BaseModel } from '../interfaces/base-model';

export abstract class FirebaseAbstractRepository<T extends BaseModel> {
  protected abstract collectionName: string;

  constructor(protected firestore: Firestore, protected injector: Injector) {}

  /**
   * Converte um documento Firestore para o tipo T
   */
  protected convertToModel(id: string, data: DocumentData): T {
    return {
      ...data,
      id,
      createdAt: data['createdAt']?.toDate() || new Date(),
      updatedAt: data['updatedAt']?.toDate() || null,
    } as T;
  }

  /**
   * Converte um modelo para dados do Firestore (remove id e converte datas)
   */
  protected convertToFirestore(model: Partial<T>): DocumentData {
    const { id, createdAt, updatedAt, ...data } = model as any;
    return data;
  }

  /**
   * Cria um novo documento
   */
  async add(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const collectionRef = collection(this.firestore, this.collectionName);
        const dataWithTimestamps = {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(collectionRef, dataWithTimestamps);
        return {
          ...data,
          id: docRef.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as T;
      } catch (error) {
        console.error('Erro ao criar documento:', error);
        throw error;
      }
    });
  }

  /**
   * Cria ou sobrescreve um documento com ID específico
   */
  async set(
    id: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
    merge: boolean = false
  ): Promise<T> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const docRef = doc(this.firestore, this.collectionName, id);
        const dataWithTimestamps = {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(docRef, dataWithTimestamps, { merge });
        return {
          ...data,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as T;
      } catch (error) {
        console.error('Erro ao criar/atualizar documento:', error);
        throw error;
      }
    });
  }

  /**
   * Busca um documento por ID
   */
  async getById(id: string): Promise<T | null> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const docRef = doc(this.firestore, this.collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return this.convertToModel(docSnap.id, docSnap.data());
        }
        return null;
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
        throw error;
      }
    });
  }

  /**
   * Busca todos os documentos da coleção ordenados por createdAt
   */
  async getAll(): Promise<T[]> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const collectionRef = collection(this.firestore, this.collectionName);
        const q = query(collectionRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) =>
          this.convertToModel(doc.id, doc.data())
        );
      } catch (error) {
        console.error('Erro ao buscar todos os documentos:', error);
        throw error;
      }
    });
  }

  /**
   * Busca documentos com query customizada
   */
  async getByQuery(constraints: QueryConstraint[]): Promise<T[]> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const collectionRef = collection(this.firestore, this.collectionName);
        const q = query(collectionRef, ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) =>
          this.convertToModel(doc.id, doc.data())
        );
      } catch (error) {
        console.error('Erro ao buscar documentos com query:', error);
        throw error;
      }
    });
  }

  /**
   * Atualiza um documento existente
   */
  async update(
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const docRef = doc(this.firestore, this.collectionName, id);
        const dataWithTimestamp = {
          ...this.convertToFirestore(data as Partial<T>),
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, dataWithTimestamp);
      } catch (error) {
        console.error('Erro ao atualizar documento:', error);
        throw error;
      }
    });
  }

  /**
   * Deleta um documento
   */
  async delete(id: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const docRef = doc(this.firestore, this.collectionName, id);
        await deleteDoc(docRef);
      } catch (error) {
        console.error('Erro ao deletar documento:', error);
        throw error;
      }
    });
  }

  /**
   * Busca documentos com filtro simples de campo
   */
  getByField(field: string, value: any): Promise<T[]> {
    return runInInjectionContext(this.injector, () =>
      this.getByQuery([where(field, '==', value)])
    );
  }

  /**
   * Busca documentos ordenados
   */
  getAllOrdered(
    field: string,
    direction: 'asc' | 'desc' = 'asc'
  ): Promise<T[]> {
    return runInInjectionContext(this.injector, () =>
      this.getByQuery([orderBy(field, direction)])
    );
  }

  /**
   * Busca documentos com limite
   */
  getWithLimit(limitCount: number): Promise<T[]> {
    return runInInjectionContext(this.injector, () =>
      this.getByQuery([limit(limitCount)])
    );
  }
}
