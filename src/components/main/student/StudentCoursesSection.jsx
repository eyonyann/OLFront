// src/components/StudentCoursesSection.jsx
import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styles } from '../../../styles';

const StudentCoursesSection = ({ courses }) => {
  return (
    <Box sx={styles.sectionContainer}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Ваши курсы
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Box sx={styles.courseCard}>
              <Box 
                component="img"
                src={course.image}
                alt={course.title}
                sx={styles.courseImage}
              />
              <Box sx={styles.courseCardContent}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" sx={styles.courseDescription}>
                  {course.description.substring(0, 100)}...
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={styles.secondaryButton}
                >
                  Перейти к курсу
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentCoursesSection;