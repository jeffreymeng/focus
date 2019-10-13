import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

const config = {
  apiKey: 'AIzaSyASbc6vJVacauzByLySuyRk2oCJiOc4tZI',
  authDomain: 'focus-44e3a.firebaseapp.com',
  databaseURL: 'https://focus-44e3a.firebaseio.com',
  projectId: 'focus-44e3a',
  storageBucket: 'focus-44e3a.appspot.com',
  messagingSenderId: '812071678933',
  appId: '1:812071678933:web:657efbada10248db55835c',
  measurementId: 'G-FNTSV4W072',
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
