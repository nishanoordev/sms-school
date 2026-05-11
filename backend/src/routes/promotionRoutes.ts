import { Router } from 'express';
import { promoteStudents } from '../controllers/promotionController';

const router = Router();

router.post('/', promoteStudents);

export default router;
