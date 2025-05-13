// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import { styles } from '../styles';
import { login } from '../services/authService'; // <-- импортируем сервис

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);      // <-- вызываем сервис
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);
      window.location.replace('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={styles.pageContainer}>
      <Box sx={styles.authContainer}>
        <Typography variant="h3" component="h1" sx={{ ...styles.gradientText, mb: 3 }}>
          Вход
        </Typography>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            value={credentials.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={styles.primaryButton}>
            Войти
          </Button>

          <Box sx={styles.linkContainer}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Еще нет аккаунта?{' '}
              <Link href="/register" color="primary">
                Создать
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
