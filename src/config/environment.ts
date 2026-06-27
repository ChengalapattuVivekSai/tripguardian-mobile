import Constants from 'expo-constants';
import { Platform } from 'react-native';

type EnvMap = Record<string, string | undefined>;

const processEnv =
  (globalThis as typeof globalThis & { process?: { env?: EnvMap } }).process?.env ??
  {};

const normalizeUrl = (value: string) => value.trim().replace(/\/+$/, '');

// =========================================================================
// ENVIRONMENT CONFIGURATION MODE
// =========================================================================

// --- PRODUCTION (Render Backend) ---
const USE_PRODUCTION = true;
const PROD_RENDER_URL = 'https://tripguardian-backend.onrender.com';

// --- DEVELOPMENT (Local Backend Fallback) ---
// To switch back to local development, uncomment the lines below and comment the production lines above.
// const USE_PRODUCTION = false;
// const PROD_RENDER_URL = '';

const deriveHostFromExpo = () => {
  const debuggerHost =
    Constants.expoConfig?.hostUri ?? (Constants as any).manifest?.debuggerHost;

  if (!debuggerHost) {
    return null;
  }

  return debuggerHost.split(':')[0];
};

const getDefaultApiUrl = () => {
  // 1. Environment variable has top priority
  const envUrl = processEnv.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return normalizeUrl(envUrl);
  }

  // 2. Render backend production URL configuration
  if (USE_PRODUCTION && PROD_RENDER_URL) {
    return `${normalizeUrl(PROD_RENDER_URL)}/api`;
  }

  // 3. Fallback to Local Host configurations
  const host = deriveHostFromExpo();
  if (host) {
    return `http://${host}:5000/api`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api';
  }

  return 'http://localhost:5000/api';
};

const getDefaultSocketUrl = () => {
  // 1. Environment variable has top priority
  const envUrl = processEnv.EXPO_PUBLIC_SOCKET_URL;
  if (envUrl) {
    return normalizeUrl(envUrl);
  }

  // 2. Render backend socket URL configuration
  if (USE_PRODUCTION && PROD_RENDER_URL) {
    return normalizeUrl(PROD_RENDER_URL);
  }

  // 3. Fallback: derive socket URL from the active API URL
  return normalizeUrl(getDefaultApiUrl()).replace(/\/api$/, '');
};

export const APP_CONFIG = {
  apiUrl: getDefaultApiUrl(),
  socketUrl: getDefaultSocketUrl(),
  apiTimeoutMs: 10000,
} as const;
