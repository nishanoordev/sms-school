import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllHomework = async (req: Request, res: Response) => {
  try {
    const hw = await prisma.homework.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(hw);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createHomework = async (req: Request, res: Response) => {
  try {
    const hw = await prisma.homework.create({ data: req.body });
    res.status(201).json(hw);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteHomework = async (req: Request, res: Response) => {
  try {
    await prisma.homework.delete({ where: { id: req.params.id } });
    res.json({ message: 'Homework deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
