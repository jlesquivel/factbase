import { Component, Input, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  nombre: string;
  datos: any = { name: '', data: '', columns: '' };
  private data: any;
  public lista: any;

  displayedColumns: string[];
  dataSource: any;

  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute
  ) {
    this.nombre = this.rutaActiva.snapshot.params.id;
    console.log(this.nombre);

    this.getFormulario();

    this.getData();
  }

  getFormulario() {
    const docRef = this.db
      .collection('forms')
      .doc(this.nombre)
      .get();

    const getDoc = docRef.subscribe(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.datos = doc.data();
        this.displayedColumns = this.datos.columns;
      }
    });
  }

  getData() {
    const docRef = this.db.collection(this.nombre).get();

    const getDocs = docRef.subscribe(res => {
      if (!res.empty) {
        console.log('No such document!');
      } else {
        this.lista = res.docs;
        console.log(res.docs);
      }
    });
  }

  ngOnInit() {}

  openDialog(): void {
    const registro = { nombre: 'Jose', correo: 'jlesquivel@hotmail.com' };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '95%',
      height: '85%',
      data: { form: this.datos, data: registro }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      console.log(`Datos :: ${this.data} `);
    });
  }
} // ******************************** fin class

// export interface FormulariosI {
//   name?: string;
//   data?: string;
//   columns?: string;
// }
