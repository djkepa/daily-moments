import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC1ZUR1QY9gaBH0yG2961_R0KV63oD9ra8',
  authDomain: 'daily-moments-c1bf9.firebaseapp.com',
  projectId: 'daily-moments-c1bf9',
  storageBucket: 'daily-moments-c1bf9.appspot.com',
  messagingSenderId: '981587136512',
  appId: '1:981587136512:web:960bb062eaade0c23208e5',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
