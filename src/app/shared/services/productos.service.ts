import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProductosI } from '../models/productosI';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private afs: AngularFirestore) {}

  private COLECCION = 'productos';
  private TIPO: ProductosI;

  public getAll(): Observable<ProductosI[]> {
    return this.afs
      .collection(this.COLECCION)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ProductosI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  save(datos: ProductosI): Promise<DocumentReference> {
    return this.afs.collection(this.COLECCION).add(datos);
  }

  edit(datos: ProductosI): Promise<void> {
    return this.afs
      .collection(this.COLECCION)
      .doc(datos.id)
      .update(datos);
  }

  // tslint:disable-next-line: ban-types
  editPartial(id: string, obj: Object): Promise<void> {
    return this.afs
      .collection(this.COLECCION)
      .doc(id)
      .update(obj);
  }

  delete(id: string): Promise<void> {
    return this.afs
      .collection(this.COLECCION)
      .doc(id)
      .delete();
  }
} // FIN CLASE
