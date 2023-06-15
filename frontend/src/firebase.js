import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDRkDZ3YAJCM5AprVobu_yzKevvnH3dfrM",
  authDomain: "gifty-22aa9.firebaseapp.com",
  projectId: "gifty-22aa9",
  storageBucket: "gifty-22aa9.appspot.com",
  messagingSenderId: "1000717760961",
  appId: "1:1000717760961:web:cdc2981a424b066c315740",
  measurementId: "G-JH91Z7Q8K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);