import { initializeApp, getApp, getApps, App, cert, ServiceAccount  } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

let app: App;

// Load service account from environment variables
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
    throw new Error(
      "Firebase service account not found. Please ensure FIREBASE_SERVICE_ACCOUNT environment variable is set or service_key.json exists locally."
    );
  }
};

const serviceAccount = getServiceAccount();

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceAccount),
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb, app as appAdmin };