import { Injectable } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  constructor(private firestore: AngularFirestore) {}

  getData(doc) {
    return this.firestore.collection(doc).snapshotChanges();
  }

  // Firestore CRUD actions example
  createData(doc, data) {
    return this.firestore.collection(doc).add(data);
  }

  updateData(doc, data) {
    const key = 'fsID';
    const fsID = data.fsID;
    delete data[key];
    return this.firestore.collection(doc).doc(fsID).set(data);
  }

  deleteData(doc, data) {
    const key = 'fsID';
    const fsID = data.fsID;
    delete data[key];
    return this.firestore.collection(doc).doc(fsID).delete();
  }
}
