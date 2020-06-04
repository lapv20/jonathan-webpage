// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBPEDytmU1tZ9G-y9j2PlMbr0Ta540seLM',
    authDomain: 'jonathan-webpage.firebaseapp.com',
    databaseURL: 'https://jonathan-webpage.firebaseio.com',
    projectId: 'jonathan-webpage',
    storageBucket: 'jonathan-webpage.appspot.com',
    messagingSenderId: '923753377372',
    appId: '1:923753377372:web:1d4f981093997ad7798099',
    measurementId: 'G-YB47LS8HZJ'
  }
};

export const COLLECTIONS = {
  contacts: 'contactos'
};

export const ADMIN_CREDENTIALS = {
  email: 'test@test.com',
  password: '12345678'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
