// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { IMessage } from '../types/data';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrYImFoeDXdvKwBbetjCT1j7U_dacC12k',
  authDomain: 'chat-app-w-next.firebaseapp.com',
  projectId: 'chat-app-w-next',
  storageBucket: 'chat-app-w-next.appspot.com',
  messagingSenderId: '110913864111',
  appId: '1:110913864111:web:c1ca7e7ce0b6ae16606f5a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);

/** auth exports  */

export const signInAnon = () => signInAnonymously(auth);
