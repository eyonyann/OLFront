// src/components/TeacherDashboard.jsx
import React from 'react';
import { Box, Button, Grid, Typography, Paper, LinearProgress } from '@mui/material';
import { styles } from '../../../styles';
// import { courses, students } from '../data/coursesData';

const TeacherDashboard = () => {
  // Моковые данные для примера
  const teacherStats = {
    totalCourses: 1,
    activeStudents: 2,
    avgProgress: 3,
    recentSubmissions: [
      { student: 'Иван Петров', course: 'React Fundamentals', status: 'Проверено' },
      { student: 'Мария Сидорова', course: 'Advanced JS', status: 'Ждет проверки' },
    ]
  };

  return (
    <Box sx={styles.sectionContainer}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Преподавательский дашборд
      </Typography>

      {/* Статистика */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.statsCard}>
            <Typography variant="h6">Курсы</Typography>
            <Typography variant="h3" sx={styles.accentText}>
              {teacherStats.totalCourses}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.statsCard}>
            <Typography variant="h6">Студенты</Typography>
            <Typography variant="h3" sx={styles.accentText}>
              {teacherStats.activeStudents}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.statsCard}>
            <Typography variant="h6">Прогресс</Typography>
            <LinearProgress 
              variant="determinate" 
              value={teacherStats.avgProgress} 
              sx={styles.progressBar}
            />
            <Typography variant="body2">{teacherStats.avgProgress}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Последние задания */}
      <Paper sx={styles.sectionPaper}>
        <Typography variant="h5" gutterBottom sx={styles.sectionSubtitle}>
          Последние задания
        </Typography>
        {teacherStats.recentSubmissions.map((item, index) => (
          <Box key={index} sx={styles.listItem}>
            <Typography variant="body1">
              {item.student} - {item.course}
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ 
                ...styles.statusButton,
                ...(item.status === 'Ждет проверки' ? styles.warningButton : {})
              }}
            >
              {item.status}
            </Button>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default TeacherDashboard;