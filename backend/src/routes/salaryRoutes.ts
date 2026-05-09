import { Router } from 'express';
import { getAllSalaryRecords, createSalaryRecord, updateSalaryStatus } from '../controllers/salaryController';
const router = Router();
router.get('/', getAllSalaryRecords);
router.post('/', createSalaryRecord);
router.put('/:id', updateSalaryStatus);
export default router;
