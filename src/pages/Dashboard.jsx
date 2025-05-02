// src/pages/Dashboard.jsx
import React from 'react';
import {Box, Button, Container, Typography, Grid} from '@mui/material';
import {styles} from '../styles';

const Dashboard = () => {
    return (
        <Container maxWidth="lg" sx={styles.pageContainer}>
            <Box sx={{width: '100%'}}>
                <Typography variant="h3" component="h1" sx={{...styles.gradientText, mb: 4}}>
                    Dashboard
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            boxShadow: 3
                        }}>
                            <Typography variant="h5" sx={{mb: 2, fontWeight: 600}}>
                                Active Courses
                            </Typography>
                            {/* Course list */}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            boxShadow: 3
                        }}>
                            <Typography variant="h5" sx={{mb: 2, fontWeight: 600}}>
                                Progress Overview
                            </Typography>
                            {/* Progress content */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;