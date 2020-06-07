import { Injectable, enableProdMode } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { COLLECTIONS } from '@env/environment';
import { IUserInfo, IClienteInfo, IProducto } from '@interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private firestore: AngularFirestore
  ) {
    console.warn('Inicializing Database Service');
  }

  saveOrUpdateOne(collection: string, element: any, isUpdate: boolean): Promise<any> {
    console.log(element, isUpdate);
    if (isUpdate && element.key !== '') {
      return new Promise((resolve, reject) => {
        this.firestore.collection(collection).doc(element.key).update(element).then(() => {
          resolve(element);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const collectionReference = this.firestore.collection<any>(collection);
        collectionReference.add(element).then(snap => {
          resolve(snap.id);
        }).catch((e) => {
          reject(e);
        });
      });
    }
  }

  getOneUserByKey(collection: string, key: string) {
    if (key !== '') {
      return this.firestore.collection<IUserInfo>(collection).doc(key).ref.get();
    } else {
      return undefined;
    }
  }

  deleteOne(collection: string, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection(collection).doc(key).delete().then(() => {
        resolve(true);
      }).catch(error => {
        console.log(error);
        resolve(false);
      });
    });
  }

  getAll(collection: string): any {
    return this.firestore.collection<IUserInfo>(collection)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as IUserInfo;
          data.key = a.payload.doc.id;
          return data;
        })
        )
      );
  }

  /**
   * Actualiza las cantidad de los productos involucrados en una venta
   * @param items
   */
  transactionVenta(items: Array<any>): Promise<any> {
    const batch = this.firestore.firestore.batch();
    items.forEach(itemVenta => {
      const prodRef = this.firestore.collection(COLLECTIONS.productos)
        .doc(itemVenta.key).ref;
      batch.update(prodRef, {
        key: itemVenta.key,
        cantidad: Number(itemVenta.existencia) - Number(itemVenta.cantidad)
      });
    });
    return batch.commit();
  }
}
