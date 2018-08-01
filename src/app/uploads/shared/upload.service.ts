import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Upload } from './upload';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePath: string = '/uploads';
  uploads: FirebaseListObservable<Upload>;

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload in progress... ', snapshot);
      },
      (error) => {
        // upload failed
        console.log('upload failed... ', error);
      },
      () => {
        // upload completed/ success
        uploadTask.snapshot.ref.getDownloadURL()
          .then(
            (dlURL: string) => {
              console.log('download URL is... ', dlURL)
              upload.url = dlURL;
              upload.name = upload.file.name;
            }
          )
          .catch(
            (error) => {
              console.log('failed getting download URL... ', error);
            }
          );

      }

    );
  }



}
