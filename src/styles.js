import { colors } from '@mui/material';
import backgroundImage from './assets/pattern_03-05.png';

export const styles = {
    'html, body, #root': {
        margin: 0,
        padding: 0,
        width: '100%',
        minHeight: '100vh',
    },
    pageContainer: {
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
            content: '""',
            position: 'fixed', // Фиксированное позиционирование вместо absolute
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            zIndex: -1, // Помещаем под основной контент
        },
        '&::after': { // Оверлей для улучшения читаемости
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.06)', // Полупрозрачный белый
            zIndex: -1
        }
    },
    authContainer: {
        width: '100%',
        p: 4,
        borderRadius: 4,
        boxShadow: 3,
        bgcolor: '#F5F5F5', // Белый фон контейнера
        maxWidth: 500
    },
    gradientText: {
        background: '#2d2d2d', // Градиент от темного к среднему серому
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        textAlign: 'center'
    },
    primaryButton: {
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 2,
        textTransform: 'none',
        background: '#2d2d2d', // Темно-серый градиент
        color: '#ffffff', // Белый текст
        '&:hover': {
            opacity: 0.9
        }
    },
    inputField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
        }
    },
    linkContainer: {
        textAlign: 'center',
        '& a': {
            textDecoration: 'none',
            color: '#4a4a4a', // Темно-серый
            '&:hover': {
                textDecoration: 'underline',
                color: '#2d2d2d' // Более темный серый
            }
        }
    },
    header: {
        background: '#F5F5F5', // Белый фон
        color: '#2d2d2d', // Темно-серый текст
        py: 2,
        boxShadow: 1 // Легкая тень
    },
    toolbar: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '0 24px'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 0.05,
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.8
        }
    },
    logoImage: {
        width: 70,
        height: 70,
        objectFit: 'contain',
        filter: 'grayscale(100%)' // Ч/Б фильтр для изображения
    },
    logoText: {
        fontWeight: 700,
        letterSpacing: 3,
        color: '#333333', // Темно-серый
        lineHeight: 1
    },
    menuContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    tabs: {
        '& .MuiTabs-indicator': { 
            backgroundColor: '#4a4a4a' // Серый индикатор
        },
        '& .MuiTab-root': { 
            py: 0 
        }
    },
    tab: {
        color: '#6b6b6b', // Средний серый
        fontWeight: 'bold',
        '&.Mui-selected': {
            color: '#333333' // Темно-серый при выборе
        }
    },





    coursesContainer: {
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        '&::before': {
            content: '""',
            position: 'fixed', // Фиксированное позиционирование вместо absolute
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            zIndex: -1, // Помещаем под основной контент
        },
        '&::after': { // Оверлей для улучшения читаемости
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.06)', // Полупрозрачный белый
            zIndex: -1
        }
      },
      headerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        maxWidth: 800,
        mx: 'auto',
        width: '100%',
      },
      titleText: {
        color: '#F5F5F5',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      searchInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        maxWidth: 600
      },
      courseGrid2: {
        justifyContent: 'center',
      },
      courseCard: {
        height: '100%',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      },
      cardMedia: {
        objectFit: 'cover',
      },
      cardContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      descriptionText: {
        mb: 2,
        minHeight: 60,
      },
      buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 'auto',
      },
      detailsButton: {
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 2,
        textTransform: 'none',
        background: '#2d2d2d',
        color: '#ffffff',
        '&:hover': {
            opacity: 0.9
        }
      },





      landingContainer: {
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        '&::before': {
            content: '""',
            position: 'fixed', // Фиксированное позиционирование вместо absolute
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            zIndex: -1, // Помещаем под основной контент
        },
        '&::after': { // Оверлей для улучшения читаемости
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.06)', // Полупрозрачный белый
            zIndex: -1
        }
        
    },




    mainContainer: {
        py: 6,
      },
      sectionContainer: {
        mb: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        '&::before': {
            content: '""',
            position: 'fixed', // Фиксированное позиционирование вместо absolute
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            zIndex: -1, // Помещаем под основной контент
        },
        '&::after': { // Оверлей для улучшения читаемости
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.06)', // Полупрозрачный белый
            zIndex: -1
        }
      },
      sectionTitle: {
        fontWeight: 700,
        color: '#F5F5F5',
        mb: 4,
        textAlign: 'center'
      },
      currentCourseCard: {
        p: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        boxShadow: 3,
      },
      currentCourseImage: {
        width: '100%',
        height: 250,
        borderRadius: 2,
        objectFit: 'cover',
      },
      currentCourseInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      progressContainer: {
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
      },
      progressItem: {
        mb: 3,
        '&:last-child': {
          mb: 0,
        },
      },
      progressBarContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      },
      progressBar: {
        flexGrow: 1,
        height: 10,
        borderRadius: 5,
      },
      progressPercentage: {
        width: 60,
        textAlign: 'right',
      },
      courseCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        bgcolor: '#F5F5F5'
      },
      courseImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
      },
      courseCardContent: {
        p: 3,
        flexGrow: 1,
      },



      statsCard: {
        p: 3,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      },
      sectionPaper: {
        p: 3,
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      },
      listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        '&:last-child': {
          borderBottom: 'none'
        }
      },
      statusButton: {
        textTransform: 'none',
        borderRadius: 20,
        px: 3
      },
      warningButton: {
        bgcolor: '#fff3e0',
        color: '#ef6c00',
        '&:hover': {
          bgcolor: '#ffe0b2'
        }
      },
      accentText: {
        color: '#1976d2',
        fontWeight: 'bold'
      },

      courseTitle: {
        background: '#2d2d2d',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,

      },

};