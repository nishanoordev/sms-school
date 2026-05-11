import { Router } from 'express';
import { getAllNotices, createNotice, updateNotice, deleteNotice } from '../controllers/noticeController';
const router = Router();
router.get('/', getAllNotices);
router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);
export default router;
