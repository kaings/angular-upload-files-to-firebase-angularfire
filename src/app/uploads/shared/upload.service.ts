import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Upload } from './upload';
import * as firebase from 'firebase/app';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePath: string = '/uploads';
  uploads: FirebaseListObservable<Upload>;

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
  }



}
