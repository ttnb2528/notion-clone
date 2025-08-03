import { initializeApp, getApp, getApps, App, cert, ServiceAccount  } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

let app: App;

// Load service account from environment variables - only when needed
const getServiceAccount = (): ServiceAccount => {
  // If running in production (Vercel), use environment variable
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
  
  // If no environment variable, we need Firebase credentials
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is required in production");
};

// Initialize Firebase Admin only when needed
const initializeFirebaseAdmin = () => {
  if (getApps().length === 0) {
    const serviceAccount = getServiceAccount();
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    app = getApp();
  }
  return app;
};

// Lazy initialization - only initialize when adminDb is accessed
const getAdminDb = () => {
  if (!app) {
    initializeFirebaseAdmin();
  }
  return getFirestore(app);
};

export { getAdminDb as adminDb, app as appAdmin };