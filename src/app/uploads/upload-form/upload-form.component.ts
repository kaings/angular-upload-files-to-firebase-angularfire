import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {

  }

  uploadMulti() {

  }
}
