import { initializeApp, getApp, getApps, App, cert, ServiceAccount  } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "./service_key.json";

let app: App;

const serviceAccount = serviceKey as ServiceAccount;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceAccount),
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb, app as appAdmin };