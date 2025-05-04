import React from 'react';
import { Box, Typography, Rating, Divider } from '@mui/material';
import { styles } from '../../styles';

const ReviewsList = ({ reviews }) => (
  <Box sx={{ ...styles.authContainer, p: 3 }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
      Последние отзывы
    </Typography>
    {reviews?.map((review) => (
      <Box key={review.id} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={review.rating} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            {new Date(review.reviewTime).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body2">
          {review.comment}
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>
    ))}
  </Box>
);

export default ReviewsList;