import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKc2hQGkdSOha-_T4zzBNJASSiWPnFP6g",
  authDomain: "acctbazaar-d000b.firebaseapp.com",
  projectId: "acctbazaar-d000b",
  storageBucket: "acctbazaar-d000b.appspot.com",
  messagingSenderId: "637292322539",
  appId: "1:637292322539:web:5aa4541c9550ba6f7ce8ae",
  measurementId: "G-9EFV0Q6376"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
