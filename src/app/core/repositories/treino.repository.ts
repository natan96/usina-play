import { Injectable, Injector } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Collection } from '../config/collection.config';
import { Treino } from '../models/treino';
import { FirebaseAbstractRepository } from './firebase-abstract.repository';

@Injectable({
  providedIn: 'root',
})
export class TreinoRepository extends FirebaseAbstractRepository<Treino> {
  protected collectionName = Collection.TREINOS;

  constructor(firestore: Firestore, injector: Injector) {
    super(firestore, injector);
  }
}
