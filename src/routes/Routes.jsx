// src/routes/Routes.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateCourse from '../pages/CreateCourse';
import Lesson  from '../pages/Lesson';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:courseId/lessons/:lessonOrder" element={<Lesson />} />
        
        {/* Дополнительно: обработка несуществующих маршрутов */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;