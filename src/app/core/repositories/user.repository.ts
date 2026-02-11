import { Injectable, Injector } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { FirebaseAbstractRepository } from './firebase-abstract.repository';

@Injectable({
  providedIn: 'root',
})
export class UserRepository extends FirebaseAbstractRepository<User> {
  protected collectionName = 'users';

  constructor(firestore: Firestore, injector: Injector) {
    super(firestore, injector);
  }
}
