import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import gradeRoutes from './routes/gradeRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS — allow requests from any origin (browser, Nginx, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

// Parse JSON request bodies
app.use(express.json());

// ✅ API Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/users', userRoutes);

// Health check — visit http://192.168.1.11:5000/
app.get('/', (req, res) => {
  res.json({ message: 'School Management API is running ✅', port: PORT });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
