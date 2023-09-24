// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABQuFVuRFj__2xpuWDZeRHJ_7pr8kNSec",
  authDomain: "meu-primeiro-projeto-672cd.firebaseapp.com",
  databaseURL: "https://meu-primeiro-projeto-672cd-default-rtdb.firebaseio.com",
  projectId: "meu-primeiro-projeto-672cd",
  storageBucket: "meu-primeiro-projeto-672cd.appspot.com",
  messagingSenderId: "669468522679",
  appId: "1:669468522679:web:8ff2e9d2fab970ac5af532"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;