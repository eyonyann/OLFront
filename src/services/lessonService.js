// src/services/lessonService.js
import api from './api';
import LessonDTO from '../dtos/LessonDTO';

export default class LessonService {
  static async getLessonsByCourseId(courseId) {
    try {
      const response = await api.get(`/courses/${courseId}/lessons`);
      return response.data.map(lesson => new LessonDTO(lesson));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    
    switch(status) {
      case 404:
        return new Error('Курс не найден');
      default:
        return new Error(serverMessage || 'Ошибка при загрузке уроков');
    }
  }
}