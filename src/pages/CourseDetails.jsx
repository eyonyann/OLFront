// src/pages/CourseDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
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
import StudentCoursesPage from '../components/courses/student/StudentCoursesPage';
import CourseService from '../services/courseService';
import LessonService from '../services/lessonService';
import ReviewService from '../services/reviewService';
import { getUserById } from '../services/userService';

import AuthorInfo from '../components/courses/AuthorInfo';
import ReviewsList from '../components/courses/ReviewsList';
import RecordBox from '../components/courses/student/RecordBox'
import { AuthContext } from '../contexts/AuthContext';

const CourseDetails = () => {
    const { courseId } = useParams();
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();

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
        const cases = [2, 0, 1, 1, 1, 2];
        return ['отзывов', 'отзыв', 'отзыва'][
            count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
        ];
    };

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const course = await CourseService.getCourseWithImage(courseId);
                const [author, lessons, reviews] = await Promise.all([
                    getUserById(course.authorId),
                    LessonService.getLessonsByCourseId(courseId),
                    ReviewService.getReviewsByCourseId(courseId)
                ]);

                setCourseData({ course, author, lessons, reviews });
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
                        <StudentCoursesPage
                            course={courseData.course}
                            lessons={courseData.lessons}
                            reviewsCount={reviewsCount}
                            roundedRating={roundedRating}
                            getReviewWord={getReviewWord}
                        />

                        {/* Боковая панель справа */}
                        <Box sx={{
                            width: { md: 350 },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}>
                            {/* Блок записи */}



                            {role === 'STUDENT' && (
                                <RecordBox courseId={courseId} />
                            )}
                            {/* Информация об авторе */}
                            <AuthorInfo author={courseData.author} />
                            
                            {/* Отзывы */}
                            <ReviewsList reviews={courseData.reviews} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};


export default CourseDetails;