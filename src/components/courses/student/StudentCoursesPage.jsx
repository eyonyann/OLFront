// src/components/StudentCoursesPage.jsx
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Rating
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { styles } from '../../../styles';

const StudentCoursesPage = ({ 
  course, 
  lessons, 
  reviewsCount, 
  roundedRating, 
  getReviewWord 
}) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  if (!course) return null;

  return (
    <Box sx={{ flex: 1 }}>
      {/* Изображение курса */}
      <Box sx={{ 
        height: 400,
        borderRadius: 3,
        mb: 3,
        backgroundImage: `url(${course.imageUrl})`,
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
            {course.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Rating 
              value={roundedRating} 
              precision={0.5} 
              readOnly 
            />
            <Typography variant="body2" color="text.secondary">
              {roundedRating.toFixed(1)} ({reviewsCount} {getReviewWord(reviewsCount)})
            </Typography>
          </Box>
        </Box>

        {/* Описание курса */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Описание курса
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          {course.description}
        </Typography>

        {/* Программа курса */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Программа курса
        </Typography>
        {lessons
          ?.slice()
          .sort((a, b) => a.lessonOrder - b.lessonOrder)
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
  );
};

export default StudentCoursesPage;