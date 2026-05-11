import { Router } from 'express';
import { getAllCalendarEvents, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from '../controllers/calendarController';
const router = Router();
router.get('/', getAllCalendarEvents);
router.post('/', createCalendarEvent);
router.put('/:id', updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);
export default router;
