import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  enableMultiTabIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";

import firebaseConfig from "./config";

function initialize() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}

function enableOffline({ firestore, firebaseApp, auth }) {
  enableMultiTabIndexedDbPersistence(firestore);
  return { firestore, firebaseApp, auth };
}

export function getFirebase() {
  const existingApp = getApps().at(0);
  if (existingApp) return initialize();
  return enableOffline(initialize());
}
