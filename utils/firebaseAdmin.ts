import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

var serviceAccount = require("../serviceAccount.json");

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDB = admin.firestore();

export { adminDB };
