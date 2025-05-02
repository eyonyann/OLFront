// src/components/main/teacher/CreateCourseSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Input,
  Alert
} from '@mui/material';
import { styles } from '../../../styles';
import CourseService from '../../../services/courseService';

const CreateCourseSection = ({ sx, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!formData.image) {
      setError('Пожалуйста, загрузите обложку курса');
      return;
    }

    try {
      // Вызываем сервис для создания курса
      const createdCourse = await CourseService.createCourse(
        {
          ...formData,
          authorId: parseInt(userId, 10) // Предполагаем, что currentUser передается пропсом
        },
        formData.image
      );

      // Перенаправляем на страницу курса
      navigate(`/courses/${createdCourse.id}`);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при создании курса');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Проверка типа файла
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, image: file });
      setError('');
    } else {
      setError('Пожалуйста, выберите файл изображения');
    }
  };

  return (
    <Box sx={{ ...styles.sectionContainer, ...sx }}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Создать новый курс
      </Typography>
      
      <Paper sx={{ ...styles.sectionPaper, p: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Название курса"
            margin="normal"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          
          <TextField
            fullWidth
            label="Описание курса"
            margin="normal"
            multiline
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Загрузить обложку курса (только изображения)
            </Typography>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            sx={styles.primaryButton}
          >
            Создать курс
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateCourseSection;