import { Router } from 'express';
import { getAllExams, createExam, deleteExam } from '../controllers/examController';
const router = Router();
router.get('/', getAllExams);
router.post('/', createExam);
router.delete('/:id', deleteExam);
export default router;
