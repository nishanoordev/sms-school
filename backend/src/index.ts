import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

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
import galleryRoutes from './routes/galleryRoutes';
import contactRoutes from './routes/contactRoutes';
import promotionRoutes from './routes/promotionRoutes';
import calendarEventsRoutes from './routes/calendarEventsRoutes';




dotenv.config();

const PORT = process.env.PORT || 3001;
const rootDir = path.resolve(__dirname, '../../');

const app = express();

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
app.use('/api/gallery',     galleryRoutes);
app.use('/api/contact',     contactRoutes);
app.use('/api/promote',     promotionRoutes);
app.use('/api/calendar-events', calendarEventsRoutes);



app.get('/api', (req, res) => {
  res.json({ message: '✅ School Management API is running' });
});

// ✅ Serve Vite Management Portal
const portalPath = path.join(rootDir, 'management-portal/dist');
app.use('/portal', express.static(portalPath));
app.get('/portal/*', (req, res) => {
  res.sendFile(path.join(portalPath, 'index.html'));
});

// ✅ Serve Static Public Website (Kiddino HTML template)
const publicPath = path.join(rootDir, 'school-website');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 API         → /api`);
  console.log(`🏫 Portal      → /portal`);
  console.log(`🌍 Public Site → /`);
});
