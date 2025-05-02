/*
  File: src/services/userService.js
*/
import api from './api';

export const getUserById = async userId => {
  const response = await api.get(`/users/id/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userDTO) => {
  const response = await api.put(`/users/${userId}`, userDTO);
  return response.data;
};