// src/components/main/admin/AdminUserPanel.jsx
import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import { styles } from '../../../styles';

const AdminUserPanel = ({ sx }) => {
  // Моковые данные
  const users = [
    { id: 1, username: 'user1', fullname: 'Иван Иванов', role: 'STUDENT' },
    { id: 2, username: 'teacher1', fullname: 'Петр Петров', role: 'TEACHER' },
    { id: 3, username: 'admin', fullname: 'Админ Админов', role: 'ADMIN' }
  ];

  return (
    <Box sx={{ ...styles.sectionContainer, ...sx }}>
      <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
        Управление пользователями
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Полное имя</TableCell>
              <TableCell>Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUserPanel;