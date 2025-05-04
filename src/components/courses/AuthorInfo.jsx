import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styles } from '../../styles';

const AuthorInfo = ({ author }) => (
  <Box sx={{ ...styles.authContainer, p: 3 }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
      Автор курса
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Avatar 
        src={author?.avatarUrl}
        sx={{ width: 56, height: 56 }}
      >
        {author?.fullname?.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {author?.fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author?.username}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body2">
      {author?.bio}
    </Typography>
  </Box>
);

export default AuthorInfo;