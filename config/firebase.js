import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDLH0h3K_85Laamnjxzp-nKF5NDEjpT1f8',
  authDomain: 'rn-insta-aaac4.firebaseapp.com',
  projectId: 'rn-insta-aaac4',
  storageBucket: 'rn-insta-aaac4.appspot.com',
  messagingSenderId: '118072138844',
  appId: '1:118072138844:web:e5ae69cc27e03c10719a99',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const db = firebase.firestore();
export {firebase, db};
