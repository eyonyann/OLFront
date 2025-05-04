// src/services/enrollmentService.js
import api from './api';
import EnrollmentDTO from '../dtos/EnrollmentDTO';

export default class EnrollmentService {
  static async enrollUser(courseId, userId) {
    try {
      const enrollmentDTO = new EnrollmentDTO({
        userId,
        courseId,
        enrollmentTime: new Date().toISOString()
      });
      
      const response = await api.post(`courses/${courseId}/enrollments`, enrollmentDTO);
      return response.data.lessonOrder;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    
    switch(status) {
      case 400:
        return new Error(serverMessage || 'Ошибка валидации данных');
      case 409:
        return new Error('Пользователь уже записан на курс');
      default:
        return new Error(serverMessage || 'Ошибка при записи на курс');
    }
  }
}