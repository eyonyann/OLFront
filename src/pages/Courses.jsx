import React, { useState, useEffect, useContext } from 'react'; // Добавлен useContext
import Header from '../components/Header';
import courseService from '../services/courseService';
import { AuthContext } from '../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { styles } from '../styles';

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role, userId } = useContext(AuthContext); //'STUDENT' 'ADMIN' 'TEACHER'

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCoursesWithImages();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const truncateText = (text, maxLength) => {
    if (!text) return 'Нет описания';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const filteredCourses = courses.filter((course) => {
    console.log(course);
    const isTeacherCourse = role === 'TEACHER' ? course.authorId == userId : true;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return isTeacherCourse && matchesSearch;
  });

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={styles.coursesContainer}>
        <Alert severity="error" sx={styles.alert}>
          Ошибка загрузки курсов: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={styles.coursesContainer}>
        <Box sx={styles.headerBox}>
          <Typography variant="h3" sx={styles.titleText}>
            Все курсы
          </Typography>

          <TextField
            label="Поиск курсов"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={styles.searchInput}
            aria-label="Поиск курсов"
          />
        </Box>

        <Grid container spacing={4} sx={styles.courseGrid2}>
          {filteredCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={styles.courseCard}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.imageUrl}
                  alt={course.title}
                  sx={styles.cardMedia}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <CardContent sx={styles.cardContent}>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={styles.descriptionText}>
                    {truncateText(course.description, 100)}
                  </Typography>
                  <Box sx={styles.buttonContainer}>
                    <Button 
                      variant="contained" 
                      sx={styles.detailsButton}
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      Подробнее
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Courses;