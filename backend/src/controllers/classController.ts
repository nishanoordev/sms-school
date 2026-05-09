import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await prisma.classRoom.findMany({ orderBy: { name: 'asc' } });
    res.json(classes);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const cls = await prisma.classRoom.create({ data: req.body });
    res.status(201).json(cls);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    await prisma.classRoom.delete({ where: { id: req.params.id } });
    res.json({ message: 'Class deleted' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
