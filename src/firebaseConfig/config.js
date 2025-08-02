// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZp0w07XlNDdqttPUOUxZlpCnJzSl3GQY",
  authDomain: "fir-authentication-69133.firebaseapp.com",
  projectId: "fir-authentication-69133",
  storageBucket: "fir-authentication-69133.firebasestorage.app",
  messagingSenderId: "994956741180",
  appId: "1:994956741180:web:245161ec970b47910a9139",
  measurementId: "G-ZD1Y86FWKZ"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
console.log("data that recived from user ",auth)
export const googleProvider=new GoogleAuthProvider()
