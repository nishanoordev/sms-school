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

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/users', userRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('School Management API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
