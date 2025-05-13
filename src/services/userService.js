/*
  File: src/services/userService.js
*/
import api from './api';
import UserDTO from '../dtos/UserDTO'

export const getUserById = async userId => {
  const response = await api.get(`/users/id/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userDTO) => {
  const response = await api.put(`/users/${userId}`, userDTO);
  return response.data;
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data.map(userData => new UserDTO(userData));
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};