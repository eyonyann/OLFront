// src/pages/CreateCourse.jsx
import React, {useState} from 'react';
import {Button, TextField, Container, Typography, Box} from '@mui/material';
import {styles} from '../styles';

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        category: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create course logic
    };

    const handleChange = (e) => {
        setCourseData({...courseData, [e.target.name]: e.target.value});
    };

    return (
        <Container maxWidth="lg" sx={styles.pageContainer}>
            <Box sx={{width: '100%'}}>
                <Typography variant="h3" component="h1" sx={{...styles.gradientText, mb: 4}}>
                    Create New Course
                </Typography>

                <Box sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    boxShadow: 3
                }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="title"
                            label="Course Title"
                            value={courseData.title}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={styles.inputField}
                            required
                        />

                        <TextField
                            name="description"
                            label="Course Description"
                            multiline
                            rows={4}
                            value={courseData.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={styles.inputField}
                            required
                        />

                        <TextField
                            name="category"
                            label="Category"
                            select
                            SelectProps={{native: true}}
                            value={courseData.category}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={styles.inputField}
                            required
                        >
                            {/* <option value="">Select Category</option> */}
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{...styles.primaryButton, mt: 3}}
                        >
                            Publish Course
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateCourse;