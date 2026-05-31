import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

import { firebaseConfig } from "@/lib/firebase/config";

let clientApp: FirebaseApp | undefined;
let clientDb: Firestore | undefined;
let clientStorage: FirebaseStorage | undefined;

export function getFirebaseClientApp() {
  if (clientApp) {
    return clientApp;
  }

  clientApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return clientApp;
}

export function getFirebaseDbClient() {
  if (clientDb) {
    return clientDb;
  }

  clientDb = getFirestore(getFirebaseClientApp());
  return clientDb;
}

export function getFirebaseStorageClient() {
  if (clientStorage) {
    return clientStorage;
  }

  clientStorage = getStorage(getFirebaseClientApp());
  return clientStorage;
}
