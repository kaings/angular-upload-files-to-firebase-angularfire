import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // Duplication, since it is initialized in the app.module already
    // firebase.initializeApp(environment.firebaseConfig);
  }
}
