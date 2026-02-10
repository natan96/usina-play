import { Injectable, Injector } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Collection } from '../config/collection.config';
import { Programa } from '../models/programa';
import { FirebaseAbstractRepository } from './firebase-abstract.repository';

@Injectable({
  providedIn: 'root',
})
export class ProgramaRepository extends FirebaseAbstractRepository<Programa> {
  protected collectionName = Collection.PROGRAMAS;

  constructor(firestore: Firestore, injector: Injector) {
    super(firestore, injector);
  }
}
