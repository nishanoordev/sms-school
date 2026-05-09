import { Router } from 'express';
import { getAllClasses, createClass, deleteClass } from '../controllers/classController';
const router = Router();
router.get('/', getAllClasses);
router.post('/', createClass);
router.delete('/:id', deleteClass);
export default router;
