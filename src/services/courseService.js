// src/services/courseService.js
import CourseDTO from '../dtos/CourseDTO';
import api from './api';

export default class CourseService {
  static async createCourse(courseData, imageFile) {
    const formData = new FormData();

    // 1. Формируем JSON-часть с данными курса
    const coursePayload = {
      title: courseData.title,
      description: courseData.description,
      rating: -1,
      authorId: courseData.authorId
    };

    // 2. Исправление синтаксической ошибки (убрана лишняя скобка)
    formData.append(
      'courseData',
      new Blob([JSON.stringify(coursePayload)], { type: 'application/json' })
    );

    // 3. Проверка и добавление изображения
    if (!imageFile) {
      throw new Error('Изображение курса обязательно');
    }
    
    // 4. Валидация типа файла
    if (!imageFile.type.startsWith('image/')) {
      throw new Error('Файл должен быть изображением');
    }
    
    formData.append('image', imageFile);

    try {
      const response = await api.post('/courses', formData);
      return new CourseDTO(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    const validationErrors = error.response?.data?.errors;

    // 5. Расширенная обработка ошибок валидации
    if (status === 400 && validationErrors) {
      return new Error(`Ошибки валидации: ${validationErrors.join(', ')}`);
    }

    switch(status) {
      case 401:
        return new Error('Требуется авторизация');
      case 403:
        return new Error('Доступ запрещен');
      case 413:
        return new Error('Файл слишком большой');
      default:
        return new Error(serverMessage || error.message || 'Ошибка при работе с курсом');
    }
  }

  // 6. Обновленный метод для обновления курса с поддержкой изображений
  static async updateCourse(id, courseData, imageFile) {
    const formData = new FormData();
    
    formData.append(
      'courseData',
      new Blob([JSON.stringify(courseData)], { type: 'application/json' })
    );

    if (imageFile) {
      if (!imageFile.type.startsWith('image/')) {
        throw new Error('Файл должен быть изображением');
      }
      formData.append('image', imageFile);
    }

    try {
      const response = await api.put(`/courses/${id}`, formData);
      return new CourseDTO(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getCourseById(id) {
    try {
        const response = await api.get(`/courses/${id}`);
        return new CourseDTO(response.data);
    } catch (error) {
        throw this.handleError(error);
    }
}

static async getAllCourses() {
  try {
    const response = await api.get('/courses');
    return response.data.map(courseData => new CourseDTO(courseData));
  } catch (error) {
    throw this.handleError(error);
  }
}

static async getAllCourseImages() {
  try {
    const response = await api.get('/courses/images');
    return response.data;
  } catch (error) {
    throw this.handleError(error);
  }
}

static async getAllCoursesWithImages() {
  try {
    const [coursesResponse, imagesResponse] = await Promise.all([
      this.getAllCourses(),
      this.getAllCourseImages()
    ]);
    
    return coursesResponse.map(course => {
      const base64Image = imagesResponse[course.id];
      return {
        ...course,
        imageUrl: base64Image ? `data:image/jpeg;base64,${base64Image}` : '/placeholder-image.jpg'
      };
    });
  } catch (error) {
    throw this.handleError(error);
  }
}


static async getCourseWithImage(id) {
    try {
      // Получаем данные курса
      const courseResponse = await api.get(`/courses/${id}`);
      const courseDTO = new CourseDTO(courseResponse.data);
      
      // Получаем изображение
      const imageResponse = await api.get(`/courses/${id}/image`, {
        responseType: 'blob'
      });
      
      // Создаем URL для изображения
      const imageUrl = URL.createObjectURL(imageResponse.data);
      
      return { ...courseDTO, imageUrl };
    } catch (error) {
      throw this.handleError(error);
    }
  }
}