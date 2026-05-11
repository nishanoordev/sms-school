import { Router } from 'express';
import { 
  getAllMessages, 
  createMessage, 
  updateMessageStatus 
} from '../controllers/contactController';

const router = Router();

router.get('/', getAllMessages);
router.post('/', createMessage);
router.put('/:id', updateMessageStatus);

export default router;
