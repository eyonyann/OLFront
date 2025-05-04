// src/components/courses/student/RecordBox.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { styles } from '../../../styles';
import { AuthContext } from '../../../contexts/AuthContext';
import EnrollmentService from '../../../services/enrollmentService';

const RecordBox = ({ courseId }) => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleEnroll = async () => {
    try {
      if (!userId) {
        navigate('/login');
        return;
      }

      const lessonOrder = await EnrollmentService.enrollUser(courseId, userId);
      navigate(`/courses/${courseId}/lessons/${lessonOrder}`);
    } catch (err) {
      console.error('Ошибка записи на курс:', err.message);
    }
  };

  return (
    <Box sx={{ ...styles.authContainer, p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Доступ к курсу
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={styles.primaryButton}
        onClick={handleEnroll}
      >
        Записаться
      </Button>
    </Box>
  );
};

export default RecordBox;