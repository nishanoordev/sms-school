import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(subjects);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const subject = await prisma.subject.create({ data: req.body });
    res.status(201).json(subject);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    await prisma.subject.delete({ where: { id: req.params.id } });
    res.json({ message: 'Subject deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
