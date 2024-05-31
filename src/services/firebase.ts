// Import the functions you need from the SDKs you need
import { ENV } from "@/env/environment";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
    getDatabase, 
    ref as fireRef, 
    get as fireGet,
    child as fireChild, 
} from "firebase/database";

import { 
  getStorage,
  ref as fireStorageRef,
} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_REALTIME_DATABASE,
  projectId: ENV.FIREBASE_PROJECT_ID || ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET  || ENV.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MSG_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);

const fireDBRef = fireRef(getDatabase(app));

const fireAppStorage = getStorage(app);

export { 
    fireDBRef,
    fireAppStorage,
    fireStorageRef, 
    fireRef, 
    fireGet,
    fireChild,
};