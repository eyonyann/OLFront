// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/Routes';
import {AuthProvider} from './contexts/AuthContext';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        // Дополнительные настройки темы
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
