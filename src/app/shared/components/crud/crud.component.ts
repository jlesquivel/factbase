import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute, Params } from '@angular/router';
import { JsonService } from 'src/app/shared/services/json.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CrudComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private data: any;
  public lista: any;

  // variables de tabla
  dataSource = null;
  displayedColumns = [];
  nombreBD = '';
  datos: any[] = [];

  // variables del formulario
  formData: any;
  nombreForm = '';
  datosForm: any = { name: '', data: '', columns: '' };

  constructor(
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private jsonSrv: JsonService,
    private DatosServ: DatosService
  ) {
    this.nombreForm = this.rutaActiva.snapshot.params.id;
    this.requestDataAndWait();
  }

  ngOnInit() {}

  async requestDataAndWait() {
    const configUrl = `assets/json/${this.nombreForm}.json`;
    this.formData = await this.jsonSrv.getJSON(configUrl);

    this.datosForm.name = this.formData[0].name;
    this.datosForm.data = JSON.stringify(this.formData);
    this.displayedColumns = this.formData[0].columns;
    this.nombreBD = this.formData[0].id;

    this.DatosServ.getData(this.nombreBD).subscribe(res => {
      this.datos = res.map(a => {
        const data = a.payload.doc.data() as any;
        const fsID = a.payload.doc.id;
        return { fsID, ...data };
      });
      this.dataSource = new MatTableDataSource<any>(this.datos);
      this.dataSource.paginator = this.paginator;
      // console.log(this.dataSource);
    });
  }

  openDialog(): void {
    const registro = {};

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      height: '90%',
      data: { form: this.datosForm, data: registro }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getRecord(pData) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      height: '90%',
      data: { form: this.datosForm, data: pData }
    });
    dialogRef.afterClosed().subscribe(result => {});
    // console.log(pData);
  }
} // ******************************** fin class
