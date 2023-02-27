import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_Y8_3ZJdy-3L8xTpSr3VbBaHK0MHSd70",
  authDomain: "jak-openai-messenger-app.firebaseapp.com",
  projectId: "jak-openai-messenger-app",
  storageBucket: "jak-openai-messenger-app.appspot.com",
  messagingSenderId: "89730999823",
  appId: "1:89730999823:web:9aa6f8828534b06afbe57a",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
