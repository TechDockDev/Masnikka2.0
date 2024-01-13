// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoQU0W3YttqrAUOpk6_lySoZNyr-_9B-M",
  authDomain: "masnikka-sneakers.firebaseapp.com",
  projectId: "masnikka-sneakers",
  storageBucket: "masnikka-sneakers.appspot.com",
  messagingSenderId: "927758388999",
  appId: "1:927758388999:web:c9a18df42599b08e1affa2",
  measurementId: "G-W0815MC9S5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig, "masnikka1");
const auth = getAuth(app);
export default auth;
