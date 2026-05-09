import { Router } from 'express';
import {
  getAllAttendance,
  getAttendanceByStudent,
  markAttendance
} from '../controllers/attendanceController';

const router = Router();

// GET /api/attendance — fetch ALL attendance records
router.get('/', getAllAttendance);

// GET /api/attendance/:studentId — fetch attendance for one student
router.get('/:studentId', getAttendanceByStudent);

// POST /api/attendance — mark attendance for a student
router.post('/', markAttendance);

export default router;
