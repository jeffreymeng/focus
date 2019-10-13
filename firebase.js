import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

const config = {
  apiKey: 'AIzaSyABzoCYBTltSmqKOzNY_SZmeQqzaaTLdTs',
  authDomain: 'quintuplecs-focus.firebaseapp.com',
  databaseURL: 'https://quintuplecs-focus.firebaseio.com',
  projectId: 'quintuplecs-focus',
  storageBucket: 'quintuplecs-focus.appspot.com',
  messagingSenderId: '268211947321',
  appId: '1:268211947321:web:0a9ad1d8e6df505122cae8',
  measurementId: 'G-R57H824BQQ',
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
