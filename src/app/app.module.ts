import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UploadService } from './uploads/shared/upload.service';

import { AppComponent } from './app.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule   // imports firebase/database, only needed for database feature
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
