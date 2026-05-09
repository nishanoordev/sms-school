import { Router } from 'express';
import { getAllHomework, createHomework, deleteHomework } from '../controllers/homeworkController';
const router = Router();
router.get('/', getAllHomework);
router.post('/', createHomework);
router.delete('/:id', deleteHomework);
export default router;
