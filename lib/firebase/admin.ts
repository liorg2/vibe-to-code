import { applicationDefault, cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

let app: App | undefined;

function initAdmin(): App {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  app = initializeApp({
    credential: raw ? cert(JSON.parse(raw)) : applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? process.env.GCLOUD_PROJECT,
  });
  return app;
}

export function getAdminAuth(): Auth {
  return getAuth(initAdmin());
}
