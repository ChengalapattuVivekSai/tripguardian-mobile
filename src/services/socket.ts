import { io } from 'socket.io-client';
import { APP_CONFIG } from '../config';

export const socket = io(
  APP_CONFIG.socketUrl,
  {
    transports: ['websocket'],
  }
);

socket.on('connect', () => {
  console.log('Socket Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket Disconnected');
});
