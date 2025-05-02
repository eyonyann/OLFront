/*
  File: src/pages/Profile.jsx
*/
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Исправленный импорт
import {
  Button,
  TextField,
  Container,
  Typography,
  Box
} from '@mui/material';
import { styles } from '../styles';
import { getUserById, updateUser } from '../services/userService';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import Header from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
    const [profileData, setProfileData] = useState({ fullname: '', username: '' });
    const [originalData, setOriginalData] = useState({ fullname: '', username: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    getUserById(userId)
      .then(user => {
        setProfileData({ fullname: user.fullname, username: user.username });
        setOriginalData({ fullname: user.fullname, username: user.username });
      })
      .catch(err => setError(err.response?.data?.message || err.message));
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!profileData.fullname.trim() || !profileData.username.trim()) {
      setError('Поля "Полное имя" и "Имя пользователя" обязательны');
      return;
    }
    
    if (!currentPassword) {
      setError('Для сохранения изменений введите текущий пароль');
      return;
    }

    const isChanged =
      profileData.fullname !== originalData.fullname ||
      profileData.username !== originalData.username ||
      newPassword.trim() !== '';

    if (!isChanged) {
      setError('Нет изменений для сохранения');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError('Новый пароль и подтверждение не совпадают');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const dto = new UpdateUserDTO({
        id: userId,
        fullname: profileData.fullname,
        username: profileData.username,
        password: currentPassword,
        newPassword: newPassword || undefined
      });

      await updateUser(userId, dto);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setOriginalData(profileData);
      setError('Изменения успешно сохранены!');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
        <Header />
        <Container maxWidth="sm" sx={styles.pageContainer}>
        <Box sx={styles.authContainer}>
            <Typography variant="h3" component="h1" sx={{ ...styles.gradientText, mb: 3 }}>
            Мой профиль
            </Typography>

            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

            <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Полное имя"
                value={profileData.fullname}
                onChange={e => setProfileData(p => ({ ...p, fullname: e.target.value }))}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                label="Имя пользователя"
                value={profileData.username}
                onChange={e => setProfileData(p => ({ ...p, username: e.target.value }))}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Текущий пароль"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Новый пароль"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />

            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Подтвердите новый пароль"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={styles.primaryButton}
            >
                Обновить профиль
            </Button>
            {/* Добавили кнопку выхода */}
            <Button
              fullWidth
              color="secondary"
              sx={{ 
                mt: 2,
                textTransform: 'none',
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'error.main'
                }
              }}
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </Button>
            </form>
        </Box>
        </Container>
    </>
  );
};

export default Profile;
