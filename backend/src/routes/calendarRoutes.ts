import { Router } from 'express';
import { getAllCalendarEvents, createCalendarEvent, deleteCalendarEvent } from '../controllers/calendarController';
const router = Router();
router.get('/', getAllCalendarEvents);
router.post('/', createCalendarEvent);
router.delete('/:id', deleteCalendarEvent);
export default router;
