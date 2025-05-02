// src/components/StudentCurrentCourseSection.jsx
import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styles } from '../../../styles';
import { courses } from '../../../data/coursesData';

const StudentCurrentCourseSection = () => {
  // Текущий активный курс
  const currentCourse = courses[0];

  return (
    <Box sx={styles.sectionContainer}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Продолжить курс
      </Typography>
      <Box sx={styles.currentCourseCard}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box 
              component="img"
              src={currentCourse.image}
              alt={currentCourse.title}
              sx={styles.currentCourseImage}
            />
          </Grid>
          <Grid item xs={12} md={8} sx={styles.currentCourseInfo}>
            <Typography variant="h5" gutterBottom fontWeight={'bold'}>
              {currentCourse.title}
            </Typography>
            <Typography variant="body1" paragraph>
              Текущий урок: Работа с хуками (useState, useEffect)
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={styles.primaryButton}
            >
              Продолжить 
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentCurrentCourseSection;