import { Component, Input, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90%'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result} `);
    });
  }
} // ******************************** fin class

// export interface FormulariosI {
//   name?: string;
//   data?: string;
//   columns?: string;
// }
