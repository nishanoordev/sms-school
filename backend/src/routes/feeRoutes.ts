import { Router } from 'express';
import { getAllFeeReceipts, createFeeReceipt, getFeeReceiptsByStudent } from '../controllers/feeController';
const router = Router();
router.get('/', getAllFeeReceipts);
router.post('/', createFeeReceipt);
router.get('/student/:studentId', getFeeReceiptsByStudent);
export default router;
