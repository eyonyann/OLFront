// src/components/AdminPanel.jsx
import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { styles } from '../../../styles';
// import { platformStats } from '../data/adminData';

const AdminPanel = () => {
  // Моковые данные
  const adminStats = {
    totalUsers: 2543,
    activeCourses: 42,
    revenue: '1,230,000 ₽',
    recentActivities: [
      { user: 'Админ Системы', action: 'Обновил курс React', time: '2 ч назад' },
      { user: 'Иван Иванов', action: 'Зарегистрировался', time: '5 ч назад' },
    ]
  };

  return (
    <Box sx={styles.sectionContainer}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Административная панель
      </Typography>

      {/* Основные метрики */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.statsCard}>
            <Typography variant="h6">Пользователи</Typography>
            <Typography variant="h3" sx={styles.accentText}>
              {adminStats.totalUsers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.statsCard}>
            <Typography variant="h6">Курсы</Typography>
            <Typography variant="h3" sx={styles.accentText}>
              {adminStats.activeCourses}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.statsCard}>
            <Typography variant="h6">Доход</Typography>
            <Typography variant="h3" sx={styles.accentText}>
              {adminStats.revenue}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Последние действия */}
      <Paper sx={styles.sectionPaper}>
        <Typography variant="h5" gutterBottom sx={styles.sectionSubtitle}>
          Активность системы
        </Typography>
        {adminStats.recentActivities.map((item, index) => (
          <Box key={index} sx={{ ...styles.listItem, py: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {item.time}
            </Typography>
            <Typography variant="body1">
              <strong>{item.user}</strong> - {item.action}
            </Typography>
          </Box>
        ))}
        <Button 
          variant="contained" 
          sx={styles.primaryButton}
          fullWidth
        >
          Экспорт отчетов
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminPanel;