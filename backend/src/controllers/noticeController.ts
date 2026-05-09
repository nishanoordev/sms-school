import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllNotices = async (req: Request, res: Response) => {
  try {
    const notices = await prisma.notice.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(notices);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createNotice = async (req: Request, res: Response) => {
  try {
    const notice = await prisma.notice.create({ data: req.body });
    res.status(201).json(notice);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteNotice = async (req: Request, res: Response) => {
  try {
    await prisma.notice.delete({ where: { id: req.params.id } });
    res.json({ message: 'Notice deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
