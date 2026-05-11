import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { sendNotificationToAll } from '../utils/notificationUtils';

export const getAllNotices = async (req: Request, res: Response) => {
  try {
    const notices = await prisma.notice.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(notices);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createNotice = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (!data.date) data.date = new Date().toISOString().split('T')[0];
    const notice = await prisma.notice.create({ data });
    
    // Trigger notification
    await sendNotificationToAll({
      title: 'New Announcement',
      body: notice.title,
      url: '/notifications'
    });

    res.status(201).json(notice);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateNotice = async (req: Request, res: Response) => {
  try {
    const notice = await prisma.notice.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(notice);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteNotice = async (req: Request, res: Response) => {
  try {
    await prisma.notice.delete({ where: { id: req.params.id } });
    res.json({ message: 'Notice deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
