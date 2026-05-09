import { Router } from 'express';
import {
  getGradesByStudent,
  addGrade
} from '../controllers/gradeController';

const router = Router();

router.get('/:studentId', getGradesByStudent);
router.post('/', addGrade);

export default router;
