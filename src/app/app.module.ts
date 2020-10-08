import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

/* FIREBASE */
import {
  AngularFirestoreModule,
  SETTINGS,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

/* FORMULARIOS DINAMICOS*/
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/* COMPONENTES DEL SISTEMA */
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { CrudComponent } from './shared/components/crud/crud.component';
import { ModalComponent } from './shared/components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, CrudComponent, ModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    HttpClientModule
  ],
  entryComponents: [ModalComponent],
  providers: [
    AngularFirestore,
    {
      provide: SETTINGS,
      useValue: environment.production
        ? undefined
        : {
            host: 'localhost:8080',
            ssl: false
          }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
