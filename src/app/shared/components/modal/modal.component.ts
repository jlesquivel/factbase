import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

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

  nombre: string;
  datos: any = { name: '', data: '', columns: '' };

  constructor(
    public dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public messaje: any,
    private db: AngularFirestore,
    private rutaActiva: ActivatedRoute
  ) {
    this.nombre = this.rutaActiva.snapshot.params.id;

    const docRef = db
      .collection('forms')
      .doc(this.nombre)
      .get();

    const getDoc = docRef.subscribe(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.datos = doc.data();
        this.fields = JSON.parse(doc.data().data);
      }
    });
  }

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.model));
    }
  }
}
