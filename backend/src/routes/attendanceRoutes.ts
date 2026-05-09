import { Router } from 'express';
import { 
  getAttendanceByStudent, 
  markAttendance 
} from '../controllers/attendanceController';

const router = Router();

router.get('/:studentId', getAttendanceByStudent);
router.post('/', markAttendance);

export default router;
