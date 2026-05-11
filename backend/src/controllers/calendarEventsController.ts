import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/calendar-events — public, returns upcoming published events
export const getPublicCalendarEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.publicCalendarEvent.findMany({
      where: { isPublished: true },
      orderBy: { date: 'asc' },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// GET /api/calendar-events/all — admin only, returns all events
export const getAllCalendarEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.publicCalendarEvent.findMany({
      orderBy: { date: 'asc' },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// POST /api/calendar-events — admin only
export const createCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { title, date, description, category, isPublished } = req.body;
    if (!title || !date) {
      return res.status(400).json({ error: 'title and date are required' });
    }
    const event = await prisma.publicCalendarEvent.create({
      data: {
        title,
        date: new Date(date),
        description: description || null,
        category: category || null,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// PUT /api/calendar-events/:id — admin only
export const updateCalendarEvent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, date, description, category, isPublished } = req.body;
    const event = await prisma.publicCalendarEvent.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// DELETE /api/calendar-events/:id — admin only
export const deleteCalendarEvent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.publicCalendarEvent.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
