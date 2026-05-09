import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.examSchedule.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(exams);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = await prisma.examSchedule.create({ data: req.body });
    res.status(201).json(exam);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteExam = async (req: Request, res: Response) => {
  try {
    await prisma.examSchedule.delete({ where: { id: req.params.id } });
    res.json({ message: 'Exam deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
