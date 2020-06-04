import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule
    ],
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
