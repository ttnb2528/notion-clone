import { initializeApp, getApp, getApps, App, cert, ServiceAccount  } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

let app: App;

// Load service account from environment variables - only when needed
const getServiceAccount = (): ServiceAccount => {
  // If running in production (Vercel), use environment variable
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
  
  // If running locally, try to import the service key file
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("./service_key.json");
  } catch {
    // During build time or if file doesn't exist, return empty object
    // This will only cause an error if Firebase is actually used
    console.warn("Service key not found - Firebase Admin will not work properly");
    return {} as ServiceAccount;
  }
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