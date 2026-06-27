import Constants from 'expo-constants';
import { Platform } from 'react-native';

type EnvMap = Record<string, string | undefined>;

const processEnv =
  (globalThis as typeof globalThis & { process?: { env?: EnvMap } }).process?.env ??
  {};

const normalizeUrl = (value: string) => value.trim().replace(/\/+$/, '');

const deriveHostFromExpo = () => {
  const debuggerHost =
    Constants.expoConfig?.hostUri ?? (Constants as any).manifest?.debuggerHost;

  if (!debuggerHost) {
    return null;
  }

  return debuggerHost.split(':')[0];
};

const getDefaultApiUrl = () => {
  const envUrl = processEnv.EXPO_PUBLIC_API_URL;

  if (envUrl) {
    return normalizeUrl(envUrl);
  }

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
  const envUrl = processEnv.EXPO_PUBLIC_SOCKET_URL;

  if (envUrl) {
    return normalizeUrl(envUrl);
  }

  return normalizeUrl(getDefaultApiUrl()).replace(/\/api$/, '');
};

export const APP_CONFIG = {
  apiUrl: getDefaultApiUrl(),
  socketUrl: getDefaultSocketUrl(),
  apiTimeoutMs: 10000,
} as const;
