import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import next from 'next';

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

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

// Resolve paths correctly whether running from src/ (ts-node) or dist/ (node)
const rootDir = path.resolve(__dirname, '../../');
const nextApp = next({ dev, dir: path.join(rootDir, 'public-website') });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
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

  app.get('/api', (req, res) => {
    res.json({ message: '✅ School Management API is running' });
  });

  // ✅ Serve Vite Management Portal
  // The built files will be in management-portal/dist
  const portalPath = path.join(rootDir, 'management-portal/dist');
  app.use('/portal', express.static(portalPath));
  app.get('/portal/*', (req, res) => {
    res.sendFile(path.join(portalPath, 'index.html'));
  });

  // ✅ Handle all other requests with Next.js (Public Website)
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`✅ Single Server running on http://localhost:${PORT}`);
    console.log(`📦 Serving API on /api`);
    console.log(`🏫 Serving Management Portal on /portal`);
    console.log(`🌍 Serving Public Website on /*`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
