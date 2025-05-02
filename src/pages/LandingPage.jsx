// src/pages/LandingPage.jsx
import React, { useContext } from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import StudentCurrentCourseSection from '../components/main/student/StudentCurrentCourseSection';
import StudentProgressSection from '../components/main/student/StudentProgressSection';
import StudentCoursesSection from '../components/main/student/StudentCoursesSection';
import TeacherDashboard from '../components/main/teacher/TeacherDashboard';
import AdminPanel from '../components/main/admin/AdminPanel';
import AdminUserPanel from '../components/main/admin/AdminUsersPanel';
import CreateCourseSection from '../components/main/teacher/CreateCourseSection';
import { AuthContext } from '../contexts/AuthContext';
import { styles } from '../styles';
import { courses } from '../data/coursesData';

const LandingPage = () => {
  const { role } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);

  const progressData = [
    { courseId: 1, title: 'React Fundamentals', progress: 65 },
    { courseId: 2, title: 'Advanced JavaScript', progress: 30 },
    { courseId: 4, title: 'Web Development', progress: 85 },
  ];

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={styles.mainContainer}>
        {role === 'STUDENT' && (
          <>
            <StudentCurrentCourseSection />
            <StudentProgressSection progressData={progressData} />
            <StudentCoursesSection courses={courses.slice(0, 3)} />
          </>
        )}
        
        {role === 'TEACHER' && (
          <>
            <TeacherDashboard />
            <CreateCourseSection 
              sx={{ mt: 4 }} 
              userId={userId}
            />
          </>
        )}
        
        {role === 'ADMIN' && (
          <>
            <AdminPanel />
            <AdminUserPanel sx={{ mt: 4 }} />
          </>
        )}
        
        {!role && (
          <div>Загрузка или неавторизированный пользователь...</div>
        )}
      </Container>
    </>
  );
};

export default LandingPage;