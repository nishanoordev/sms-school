import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: req.params.id }
    });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await prisma.teacher.create({
      data: {
        ...req.body,
        dateOfJoining: new Date(req.body.dateOfJoining)
      }
    });
    res.status(201).json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (data.dateOfJoining) data.dateOfJoining = new Date(data.dateOfJoining);
    
    const teacher = await prisma.teacher.update({
      where: { id: req.params.id },
      data
    });
    res.json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    await prisma.teacher.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
