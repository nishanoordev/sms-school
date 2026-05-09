import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import gradeRoutes from './routes/gradeRoutes';
import userRoutes from './routes/userRoutes';
import noticeRoutes from './routes/noticeRoutes';
import leaveRoutes from './routes/leaveRoutes';
import salaryRoutes from './routes/salaryRoutes';
import homeworkRoutes from './routes/homeworkRoutes';
import examRoutes from './routes/examRoutes';
import calendarRoutes from './routes/calendarRoutes';
import feeRoutes from './routes/feeRoutes';
import classRoutes from './routes/classRoutes';
import subjectRoutes from './routes/subjectRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS — allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json());

// ✅ All API Routes
app.use('/api/students',    studentRoutes);
app.use('/api/teachers',    teacherRoutes);
app.use('/api/attendance',  attendanceRoutes);
app.use('/api/grades',      gradeRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/notices',     noticeRoutes);
app.use('/api/leave',       leaveRoutes);
app.use('/api/salary',      salaryRoutes);
app.use('/api/homework',    homeworkRoutes);
app.use('/api/exams',       examRoutes);
app.use('/api/calendar',    calendarRoutes);
app.use('/api/fees',        feeRoutes);
app.use('/api/classes',     classRoutes);
app.use('/api/subjects',    subjectRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '✅ School Management API is running',
    port: PORT,
    routes: [
      'students', 'teachers', 'attendance', 'grades', 'users',
      'notices', 'leave', 'salary', 'homework', 'exams',
      'calendar', 'fees', 'classes', 'subjects'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 ${14} API routes registered`);
});
