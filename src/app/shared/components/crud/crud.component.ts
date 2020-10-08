import {
  Component,
  Input,
  OnInit,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { JsonService } from 'src/app/services/json.service';
import { TooltipPosition } from '@angular/material/tooltip';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CrudComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action'
  ];
  dataSource = ELEMENT_DATA;

  nombre: string;
  datos: any = { name: '', data: '', columns: '' };
  private data: any;
  public lista: any;

  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private jsonSrv: JsonService
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
    const configUrl = `assets/json/${this.nombre}.json`;

    this.jsonSrv.getJSON(configUrl).subscribe(data => {
      this.datos.data = JSON.stringify(data);
      this.datos.name = data[0].name;
      this.datos.columns = data[0].columns;
    });
  }

  openDialog(): void {
    const registro = { nombre: 'Jose', correo: 'jlesquivel@hotmail.com' };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      height: '90%',
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
