import { auth } from "../auth/firebase";

let cachedToken: string | null = null;

export async function cacheToken(newToken = null): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    if (newToken) {
      cachedToken = newToken;
      return cachedToken;
    }
    const token = await user.getIdToken();
    cachedToken = token;
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCachedToken(): Promise<string | null> {
  if (!cachedToken) return await cacheToken();
  return cachedToken;
}

export function clearToken() {
  cachedToken = null;
}
