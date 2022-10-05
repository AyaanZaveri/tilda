import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmGWuA1N7MtsJViN5RM0OxK9eG6rCSKG4",
  authDomain: "tilda-c198e.firebaseapp.com",
  projectId: "tilda-c198e",
  storageBucket: "tilda-c198e.appspot.com",
  messagingSenderId: "527334118102",
  appId: "1:527334118102:web:639fcf72449c11a286ef77",
  measurementId: "G-1F3VL8Q9WW",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export { auth, provider, db };
