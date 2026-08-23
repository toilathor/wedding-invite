import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../environments/environment";

// Khởi tạo Firebase App Singleton
export const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();

// Khởi tạo Firestore instance
export const db = getFirestore(app);
