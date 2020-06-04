import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IContact } from '@interfaces/contact.interface';
import { COLLECTIONS } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private firestore: AngularFirestore
  ) {
    console.warn('Inicializing Database Service');
  }

  /**
   * Almacena los datos del formulario de contacto en Firebase
   * @param contact Obj
   */
  saveContact(contact: IContact): Promise<any> {
    return new Promise((resolve, reject) => {
      const collectionReference = this.firestore.collection<IContact>(COLLECTIONS.contacts);
      collectionReference.add(contact).then(snap => {
        resolve(snap);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getAllContacts(): any {
    return this.firestore.collection<IContact>(COLLECTIONS.contacts)
        .snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as IContact;
                data.key = a.payload.doc.id;
                return data;
            })
            )
        );
}
}
