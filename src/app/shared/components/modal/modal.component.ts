import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DatosService } from '../../services/datos.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  datos: any;
  baseDatos = '';
  nuevo = true;

  constructor(
    private DatosServ: DatosService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.datos = data.form;
    this.fields = JSON.parse(data.form.data);
    this.model = data.data;
    this.baseDatos = this.fields[0].id;
    this.nuevo = JSON.stringify(this.data.data) === JSON.stringify({});
  }

  ngOnInit() {}

  save() {
    if (this.form.valid) {
      if (this.nuevo) {
        this.DatosServ.createData(this.baseDatos, this.model).then(res => {
          /*do something here....maybe clear the form or give a success message*/
          this.close();
        });
      } else {
        this.DatosServ.updateData(this.baseDatos, this.model).then(res => {
          /*do something here....maybe clear the form or give a success message*/
          this.close();
        });
      }
    }
  }
  delete() {
    this.DatosServ.deleteData(this.baseDatos, this.model).then(res => {
      /*do something here....maybe clear the form or give a success message*/
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  // ********************/
}
