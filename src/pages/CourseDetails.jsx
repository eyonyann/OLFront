// src/pages/CourseDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Divider,
  Rating,
  CircularProgress,
  Alert
} from '@mui/material';
import { styles } from '../styles';
import Header from '../components/Header';
import CourseService from '../services/courseService';
import LessonService from '../services/lessonService';
import ReviewService from '../services/reviewService';
import { getUserById } from '../services/userService';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState({
      course: null,
      author: null,
      lessons: [],
      reviews: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const reviewsCount = courseData.reviews.length;
    const averageRating = reviewsCount > 0 
    ? courseData.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount 
    : 0;
    const roundedRating = Math.round(averageRating * 2) / 2;

    const getReviewWord = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'отзывов';
    if (lastDigit === 1) return 'отзыв';
    if (lastDigit >= 2 && lastDigit <= 4) return 'отзыва';
    return 'отзывов';
    };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
          try {
            // Получаем данные курса
            const course = await CourseService.getCourseWithImage(courseId);
            
            // Параллельно запрашиваем дополнительные данные
            const [author, lessons, reviews] = await Promise.all([
              getUserById(course.authorId),
              LessonService.getLessonsByCourseId(courseId),
              ReviewService.getReviewsByCourseId(courseId)
            ]);
    
            setCourseData({
              course,
              author,
              lessons,
              reviews
            });
    
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCourseData();
      }, [courseId]);
    
      if (loading) {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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

      console.log(courseData.author)
      
    return (
        <>
        <Header />
        <Container maxWidth="lg" sx={{ ...styles.pageContainer, mt: 8 }}>
            <Box sx={{ 
                width: '100%', 
                maxWidth: 1200, 
                mx: 'auto',
                position: 'relative'
            }}>


                <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Основной контент слева */}
                    <Box sx={{ flex: 1 }}>
                        {/* Изображение курса */}
                        <Box sx={{ 
                            height: 400,
                            borderRadius: 3,
                            mb: 3,
                            backgroundImage: `url(${courseData.course.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />

                        <Box sx={{
                            bgcolor: 'background.paper',
                            borderRadius: 3,
                            p: 4,
                            boxShadow: 1,
                            position: 'relative',
                            mx: 'auto',
                            maxWidth: 1200
                        }}>
                        {/* Заголовок и основная информация */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h3" component="h1" sx={{ ...styles.courseTitle, mb: 2 }}>
                                {courseData.course.title}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Rating 
                                    value={roundedRating} 
                                    precision={0.5} 
                                    readOnly 
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {averageRating.toFixed(1)} ({reviewsCount} {getReviewWord(reviewsCount)})
                                </Typography>
                            </Box>
                        </Box>

                        {/* Описание курса */}
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Описание курса
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                            {courseData.course.description}
                        </Typography>

                        {/* Программа курса */}
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Программа курса
                        </Typography>
                        {courseData.lessons
                            ?.slice() // Создаем копию массива, чтобы не мутировать оригинал
                            .sort((a, b) => a.lessonOrder - b.lessonOrder) // Сортируем по lessonOrder
                            .map((lesson) => (
                                <Accordion key={lesson.id} sx={{ mb: 1 }}>
                                    <AccordionSummary
                                        onClick={(e) => {
                                            if (e.target.closest('.MuiAccordionSummary-expandIconWrapper')) return;
                                            navigate(`/courses/${courseId}/lessons/${lesson.lessonOrder}`);
                                        }}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': { backgroundColor: 'action.hover' }
                                        }}
                                    >
                                        <Typography>
                                            Урок {lesson.lessonOrder}: {lesson.title}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{lesson.description}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                    </Box>
                    </Box>

                    {/* Боковая панель справа */}
                    <Box sx={{
                        width: { md: 350 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}>
                        {/* Блок записи */}
                        <Box sx={{ ...styles.authContainer, p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Доступ к курсу
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={styles.primaryButton}
                            >
                                Записаться
                            </Button>
                            {/* <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Стоимость:</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {course.price}₽
                                </Typography>
                            </Box> */}
                        </Box>

                        {/* Информация об авторе */}
                        <Box sx={{ ...styles.authContainer, p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Автор курса
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Avatar 
                                    src={courseData.author?.avatarUrl}
                                    sx={{ width: 56, height: 56 }}
                                >
                                    {courseData.author?.fullname?.charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {courseData.author?.fullname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {courseData.author?.username}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                {courseData.author?.bio}
                            </Typography>
                        </Box>
                        {/* Отзывы */}
                        <Box sx={{ ...styles.authContainer, p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Последние отзывы
                            </Typography>
                            {courseData.reviews?.map((review) => (
                                <Box key={review.id} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Rating value={review.rating} size="small" readOnly />
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(review.reviewTime).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        {review.comment}
                                    </Typography>
                                    <Divider sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
        </>
    );
};

export default CourseDetails;