// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, TextField, Container, Typography, Box, Link, 
  MenuItem, Select, InputLabel, FormControl 
} from '@mui/material';
import { styles } from '../styles';
import { register } from '../services/authService';  // <-- импортируем сервис

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'STUDENT',
    fullname: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);    // <-- вызываем сервис
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);
      window.location.replace('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm" sx={styles.pageContainer}>
      <Box sx={styles.authContainer}>
        <Typography variant="h3" component="h1" sx={{ ...styles.gradientText, mb: 3 }}>
          Create Account
        </Typography>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            name="fullname"
            label="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
              required
            >
              <MenuItem value="STUDENT">Student</MenuItem>
              <MenuItem value="TEACHER">Teacher</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth sx={styles.primaryButton}>
            Create Account
          </Button>

          <Box sx={styles.linkContainer}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <Link href="/login" color="primary">
                Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
