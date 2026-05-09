import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getGradesByStudent = async (req: Request, res: Response) => {
  try {
    const grades = await prisma.grade.findMany({
      where: { studentId: req.params.studentId }
    });
    res.json(grades);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addGrade = async (req: Request, res: Response) => {
  try {
    const grade = await prisma.grade.create({
      data: req.body
    });
    res.status(201).json(grade);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
