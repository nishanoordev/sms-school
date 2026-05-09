import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        attendance: true,
        grades: true,
        fees: true
      }
    });
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: {
        attendance: true,
        grades: true,
        fees: true
      }
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.create({
      data: {
        ...req.body,
        dob: new Date(req.body.dob)
      }
    });
    res.status(201).json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (data.dob) data.dob = new Date(data.dob);
    
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data
    });
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await prisma.student.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
