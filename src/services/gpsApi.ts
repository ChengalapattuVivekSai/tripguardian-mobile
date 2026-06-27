import api from './api';

export const sendLocation =
async (data: any) => {
  return api.post('/gps/update', data);

};
