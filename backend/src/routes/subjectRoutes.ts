import { Router } from 'express';
import { getAllSubjects, createSubject, deleteSubject } from '../controllers/subjectController';
const router = Router();
router.get('/', getAllSubjects);
router.post('/', createSubject);
router.delete('/:id', deleteSubject);
export default router;
