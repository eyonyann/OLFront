// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { styles } from '../../../styles';
import { getAllLogs } from '../../../services/logService';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import courseService from '../../../services/courseService';
import { getAllUsers } from '../../../services/userService';

const AdminPanel = () => {
  const [logs, setLogs] = useState([]);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    usersWithRole: { 
      admin: 0, 
      author: 0,
      student: 0 // Добавлено новое поле для учеников
    },
    totalCourses: 0,
    averageLessonsPerCourse: 0,
    averageCoursesPerAuthor: 0
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsData = await getAllLogs();
        setLogs(logsData);

        const [courses, users] = await Promise.all([
          courseService.getAllCourses(),
          getAllUsers()
        ]);

        const authorsCourses = {};
        let totalLessons = 0;
        
        courses.forEach(course => {
          totalLessons += course.lessons?.length || 0;
          authorsCourses[course.authorId] = (authorsCourses[course.authorId] || 0) + 1;
        });

        const authorsCount = Object.keys(authorsCourses).length;
        const adminUsers = users.filter(u => u.role === 'ADMIN').length;
        const authorUsers = users.filter(u => u.role === 'TEACHER').length;
        const studentUsers = users.filter(u => u.role === 'STUDENT').length; // Новый подсчет

        setAdminStats({
          totalUsers: users.length,
          usersWithRole: { 
            admin: adminUsers, 
            author: authorUsers,
            student: studentUsers // Добавляем учеников в статистику
          },
          totalCourses: courses.length,
          averageLessonsPerCourse: courses.length > 0 
            ? Math.round(totalLessons / courses.length) 
            : 0,
          averageCoursesPerAuthor: authorsCount > 0
            ? Math.round(courses.length / authorsCount)
            : 0
        });
      } catch (error) {
        console.error('Ошибка при загрузке логов:', error);
      }
    };
    fetchLogs();
  }, []);

  const handleExportTXT = () => {
    // Форматируем дату
    const date = new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  
    // Создаем содержимое файла
    let txtContent = `Отчет об работе системы от ${date}\n\n`;
    txtContent += "ID пользователя | Действие | Дата и время\n";
    txtContent += "-----------------------------------------\n";
  
    // Добавляем записи
    logs.slice(0, 20).forEach(log => {
      const timestamp = new Date(log.logTime).toLocaleString('ru-RU');
      txtContent += `${log.userId} | ${log.title} | ${timestamp}\n`;
    });
  
    // Создаем Blob с UTF-8 BOM
    const blob = new Blob(["\uFEFF" + txtContent], {
      type: "text/plain;charset=UTF-8"
    });
  
    // Скачиваем файл
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `system_report_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <Box sx={styles.sectionContainer}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Административная панель
      </Typography>

      {/* метрики */}
      {/* метрики */}
<Box sx={{ display: 'flex', justifyContent: 'center' }}>
  <Grid container spacing={3} sx={{ 
    mb: 4,
    maxWidth: '1200px', // Ограничиваем максимальную ширину для лучшего вида
    width: '100%', // Занимает всю доступную ширину
  }}>
    {[ // Массив метрик для удобства рендеринга
      { title: 'Всего пользователей', value: adminStats.totalUsers },
      { title: 'Администраторов', value: adminStats.usersWithRole.admin },
      { title: 'Авторов', value: adminStats.usersWithRole.author },
      { title: 'Учеников', value: adminStats.usersWithRole.student },
      { title: 'Всего курсов', value: adminStats.totalCourses },
      { title: 'В среднем курсов у автора', value: adminStats.averageCoursesPerAuthor },
    ].map((metric, index) => (
      <Grid item xs={12} md={4} key={index}> {/* Изменил md={3} на md={4} */}
        <Paper sx={{ 
          ...styles.statsCard,
          mx: 'auto', // Центрирование внутри колонки
          maxWidth: 345 // Опционально: ограничение ширины карточки
        }}>
          <Typography variant="h6">{metric.title}</Typography>
          <Typography variant="h3" sx={styles.accentText}>
            {metric.value}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

      {/* Последние действия */}
      <Paper sx={styles.sectionPaper}>
        <Typography variant="h5" gutterBottom sx={styles.sectionSubtitle}>
          Активность системы
        </Typography>
        {logs.slice(0, 5).map((log, index) => (
          <Box key={index} sx={{ ...styles.listItem, py: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {formatDistanceToNow(new Date(log.logTime), {
                addSuffix: true,
                locale: ru
              })}
            </Typography>
            <Typography variant="body1">
              <strong>Пользователь #{log.userId}</strong> - {log.title}
            </Typography>
          </Box>
        ))}
        <Button 
          variant="contained" 
          sx={styles.primaryButton}
          fullWidth
          onClick={handleExportTXT}
        >
          Экспорт отчета
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminPanel;