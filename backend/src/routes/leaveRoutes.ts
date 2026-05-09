import { Router } from 'express';
import { getAllLeaveRequests, createLeaveRequest, updateLeaveStatus } from '../controllers/leaveController';
const router = Router();
router.get('/', getAllLeaveRequests);
router.post('/', createLeaveRequest);
router.put('/:id', updateLeaveStatus);
export default router;
