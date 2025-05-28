import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgcNUWKPTIFmLhebNLgxpxNUGJVhQerZo",
  authDomain: "webrtc-c95f3.firebaseapp.com",
  projectId: "webrtc-c95f3",
  storageBucket: "webrtc-c95f3.appspot.com",
  messagingSenderId: "5902951449",
  appId: "1:5902951449:web:40b362dec3cc50eeb0b688",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
