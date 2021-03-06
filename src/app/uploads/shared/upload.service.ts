import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Upload } from './upload';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePath: string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

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
              console.log('uploaded file details... ', upload);
              this.saveFileData(upload);
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

  // write the file details (defined in Upload class) to the realtime database
  private saveFileData(upload: Upload) {

    /* using angularFire - as long as firebase web setup is initialized, auth token is not necessary? */
    const data = this.db.list(`${this.basePath}/`).push(upload);
    console.log('data... ', data);
    console.log('key... ', data.key);

    /* using firebase SDK - auth token is NEEDED */
    /*
    const dbRef = firebase.database().ref(`${this.basePath}/`).push(upload);
    console.log('dbRef... ', dbRef);
    console.log('key... ', dbRef.key);
    */
  }


  /* dummy deleteUpload -- for reference */
  private deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(
        () => {
          this.deleteFileStorage(upload.name);
        }
      )
      .catch(
        (error) => {
          console.log('error deleting file...', error);
        }
      );
  }

  // delete the file details from realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
