/*
  File: src/services/logService.js
*/
import api from './api';
import LogDTO from '../dtos/LogDTO';

export const getAllLogs = async () => {
  const response = await api.get(`/logs`);
  return response.data.map(log => new LogDTO(log));
};