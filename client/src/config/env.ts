function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  firebase: {
    apiKey: getEnv("REACT_APP_FIREBASE_API_KEY"),
    authDomain: getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnv("REACT_APP_FIREBASE_PROJECT_ID"),
    storageBucket: getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getEnv("REACT_APP_FIREBASE_APP_ID"),
  },
  apiBaseUrl: getEnv("REACT_APP_API_BASE_URL"),
};
