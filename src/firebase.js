import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHeDpej0DMpVVNy6yTLXZkbEa173qkpGs",
    authDomain: "linked-in-2024.firebaseapp.com",
    projectId: "linked-in-2024",
    storageBucket: "linked-in-2024.appspot.com",
    messagingSenderId: "637694114887",
    appId: "1:637694114887:web:ee20db17af4cc467914562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };