// src/components/StudentProgressSection.jsx
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { styles } from '../../../styles';

const StudentProgressSection = ({ progressData }) => {
  return (
    <Box sx={styles.sectionContainer}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Ваш прогресс
      </Typography>
      <Box sx={styles.progressContainer}>
        {progressData.map((item) => (
          <Box key={item.courseId} sx={styles.progressItem}>
            <Typography variant="body1" sx={styles.progressTitle}>
              {item.title}
            </Typography>
            <Box sx={styles.progressBarContainer}>
              <LinearProgress 
                variant="determinate" 
                value={item.progress}
                sx={styles.progressBar}
              />
              <Typography variant="body2" sx={styles.progressPercentage}>
                {item.progress}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudentProgressSection;