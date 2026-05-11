import { Router } from 'express';
import {
  getPublicCalendarEvents,
  getAllCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '../controllers/calendarEventsController';

const router = Router();

// Public — no auth required
router.get('/', getPublicCalendarEvents);

// Admin only
router.get('/all', getAllCalendarEvents);
router.post('/', createCalendarEvent);
router.put('/:id', updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);

export default router;
