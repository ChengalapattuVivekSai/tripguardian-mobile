import axios from 'axios';
import { APP_CONFIG } from '../config';

const api = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  timeout: APP_CONFIG.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
