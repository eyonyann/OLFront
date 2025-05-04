// src/pages/Lesson.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Divider,
  TextField,
  Chip
} from '@mui/material';
import { styles } from '../styles';
import Header from '../components/Header';
import LessonService from '../services/lessonService';
import AssignmentService from '../services/assignmentService';
import AnswerDTO from '../dtos/AnswerDTO';
import SubmissionDTO from '../dtos/SubmissionDTO';
import { AuthContext } from '../contexts/AuthContext';

const Lesson = () => {
  const { courseId, lessonOrder } = useParams();
  const { userId } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загрузка урока
        const lessonData = await LessonService.getLessonByCourseIdAndOrder(courseId, lessonOrder);
        setLesson(lessonData);

        // Загрузка задания
        const assignmentData = await AssignmentService.getAssignmentForLesson(lessonData.id);
        setAssignment(assignmentData);

        // Загрузка ответа и оценки только если есть задание
        if (assignmentData) {
          const [answerRes, submissionRes] = await Promise.all([
            AssignmentService.getUserAnswer(assignmentData.id)
              .catch(() => new AnswerDTO()), // Создаем пустой ответ при ошибке
            AssignmentService.getSubmission(assignmentData.id)
              .catch(() => new SubmissionDTO()) // Создаем пустую оценку при ошибке
          ]);

          setAnswer(answerRes);
          setSubmission(submissionRes);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, lessonOrder, userId]);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmitAnswer = async () => {
    try {
      const newAnswer = await AssignmentService.submitAnswer(
        assignment.id,
        userId,
        userAnswer // Исправлено на content согласно DTO
      );

      setAnswer(newAnswer);
      setUserAnswer('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка отправки ответа');
    }
  };

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={styles.pageContainer}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ ...styles.pageContainer, mt: 8 }}>
        {/* Основной контент урока */}
        <Box sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          position: 'relative'
        }}>
          <Typography variant="h3" component="h1" sx={{ ...styles.titleText, textAlign: 'left' }}>
            Урок {lesson.lessonOrder}: {lesson.title}
          </Typography>

          {/* Видео блок */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            my: 4,
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: '#000'
          }}>
            {lesson.videoURL ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(lesson.videoURL)}?autoplay=1&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  border: 'none'
                }}
                title={`Видео урока: ${lesson.title}`}
              />
            ) : (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.800',
                color: 'white'
              }}>
                <Typography>Видео недоступно</Typography>
              </Box>
            )}
          </Box>

          {/* Контент урока */}
          <Box sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            p: 4,
            boxShadow: 1,
            mb: 4
          }}>
            {lesson.content && (
              <Box
                sx={styles.htmlContent}
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            )}
          </Box>

          {/* Блок с заданием */}
          {assignment && (
            <Box sx={{
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 4,
              boxShadow: 1,
              mb: 4,
              mt: 4
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Практическое задание
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Typography variant="body1" paragraph>
                {assignment.title}
              </Typography>

              {answer?.content ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Ваш ответ:
                  </Typography>
                  <Box sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    mb: 2
                  }}>
                    {answer.content}
                  </Box>
                  {submission?.grade ? (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">
                        Оценка преподавателя:
                        <Chip
                          label={submission.grade}
                          color="primary"
                          sx={{ ml: 1, fontSize: '1rem' }}
                        />
                      </Typography>
                      {submission.content && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {submission.content}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Typography color="text.secondary">
                      Ответ еще не проверен преподавателем
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Ваш ответ"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim()}
                  >
                    Отправить ответ
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

// Вспомогательная функция для извлечения ID YouTube видео
function getYouTubeId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default Lesson;