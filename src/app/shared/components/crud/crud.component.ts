import { Component, Input, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

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
    private rutaActiva: ActivatedRoute,
    private http: HttpClient
  ) {
    this.nombre = this.rutaActiva.snapshot.params.id;
  }

  getData() {
    const docRef = this.db.collection(this.nombre).get();

    const getDocs = docRef.subscribe(res => {
      if (!res.empty) {
        console.log('No such document!');
      } else {
        this.lista = res.docs;
        // console.log(res.docs);
      }
    });
  }

  ngOnInit() {
    const configUrl = 'assets/json/frm-empleados.json';
    this.http
      .get(configUrl)
      .subscribe(fields => [(this.datos.data = JSON.stringify(fields))]);
    this.datos.name = 'Prueba';
    console.log(this.datos.data);
  }

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
