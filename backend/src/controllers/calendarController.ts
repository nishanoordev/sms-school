import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllCalendarEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.calendarEvent.findMany({ orderBy: { date: 'asc' } });
    res.json(events);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createCalendarEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.calendarEvent.create({ data: req.body });
    res.status(201).json(event);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteCalendarEvent = async (req: Request, res: Response) => {
  try {
    await prisma.calendarEvent.delete({ where: { id: req.params.id } });
    res.json({ message: 'Event deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
