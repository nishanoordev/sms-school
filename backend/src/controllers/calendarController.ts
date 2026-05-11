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
    
    // Sync with Public Calendar
    await prisma.publicCalendarEvent.create({
      data: {
        title: event.title,
        date: new Date(event.date),
        description: event.description,
        category: event.type,
        isPublished: true
      }
    });

    res.status(201).json(event);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateCalendarEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.calendarEvent.update({
      where: { id: req.params.id },
      data: req.body
    });
    
    // Sync with Public Calendar (find by old title/date or just update all matching?)
    // Simplest is to update matching ones
    await prisma.publicCalendarEvent.updateMany({
      where: {
        title: event.title,
        date: new Date(event.date)
      },
      data: {
        title: event.title,
        date: new Date(event.date),
        description: event.description,
        category: event.type
      }
    });

    res.json(event);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteCalendarEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.calendarEvent.findUnique({ where: { id: req.params.id } });
    if (event) {
      // Try to find and delete from public calendar by title and date
      await prisma.publicCalendarEvent.deleteMany({
        where: {
          title: event.title,
          date: new Date(event.date)
        }
      });
      await prisma.calendarEvent.delete({ where: { id: req.params.id } });
    }
    res.json({ message: 'Event deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
