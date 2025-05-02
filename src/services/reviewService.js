// src/services/reviewService.js
import api from './api';
import ReviewDTO from '../dtos/ReviewDTO';

export default class ReviewService {
  static async getReviewsByCourseId(courseId) {
    try {
      const response = await api.get(`/courses/${courseId}/reviews`);
      return response.data.map(review => new ReviewDTO(review));
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
        return new Error(serverMessage || 'Ошибка при загрузке отзывов');
    }
  }
}