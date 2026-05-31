import type { FirebaseOptions } from "firebase/app";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAexcnZoxfwlELuKe84w4c8ZtdFC7QS8Qs",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:171913879858:web:19cfde24aaafe96ea2f72b",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "recap-62a9e.firebaseapp.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "171913879858",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "recap-62a9e",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "recap-62a9e.firebasestorage.app"
};
