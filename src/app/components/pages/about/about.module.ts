import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { MaterialModule } from '../../../material.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AboutRoutingModule,

    FormlyMaterialModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'Valor requerido' }]
    })
  ]
})
export class AboutModule {}
