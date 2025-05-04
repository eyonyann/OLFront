import api from './api';
import AnswerDTO from '../dtos/AnswerDTO';
import AssignmentDTO from '../dtos/AssignmentDTO';
import SubmissionDTO from '../dtos/SubmissionDTO';

const AssignmentService = {

    async getAssignmentForLesson(lessonId) {
        const response = await api.get(`/lessons/${lessonId}/assignment`);
        return new AssignmentDTO(response.data);
    },

    async getUserAnswer(assignmentId) {
        try {
          const response = await api.get(`/assignments/${assignmentId}/my-answer`);
          return new AnswerDTO(response.data);
        } catch (error) {
          if (error.response?.status === 404) {
            return new AnswerDTO({}); // Возвращаем пустой DTO
          }
          throw error; // Пробрасываем другие ошибки
        }
      },
  
      async getSubmission(assignmentId) {
        try {
          const response = await api.get(`/assignments/${assignmentId}/my-submission`);
          return new SubmissionDTO(response.data);
        } catch (error) {
          if (error.response?.status === 404) {
            return new SubmissionDTO({}); // Возвращаем пустой DTO
          }
          throw error; // Пробрасываем другие ошибки
        }
      },
  
  async submitAnswer(assignmentId, userId, answerData) {
    console.log(answerData.text)
    console.log(answerData)
    const answerDTO = new AnswerDTO({
      assignmentId,
      userId,
      content: answerData,
      time: new Date().toISOString()
    });


    const response = await api.post(
      `/assignments/${assignmentId}/answers`, 
      answerDTO
    );
    
    return new AnswerDTO(response.data); // Преобразуем ответ сервера в DTO
  }
  
};

  export default AssignmentService;