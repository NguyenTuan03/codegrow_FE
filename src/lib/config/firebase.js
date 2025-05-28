// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA3r3JKy6uhyP8DCgPIt-oLMe-X6RRF92Q',
    authDomain: 'petspa391.firebaseapp.com',
    projectId: 'petspa391',
    storageBucket: 'petspa391.appspot.com',
    messagingSenderId: '45321078130',
    appId: '1:45321078130:web:566ec5abaadc7203c589eb',
    measurementId: 'G-R1DET4JH8V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
