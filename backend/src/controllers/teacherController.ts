import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' }
    });
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
    const {
      employeeId, name, qualification, dateOfJoining,
      assignedClass, subjects, contact, email, aadhaar, salary, designation
    } = req.body;

    // Bug fix: handle missing or empty dateOfJoining gracefully
    const joiningDate = dateOfJoining && dateOfJoining.trim() !== ''
      ? new Date(dateOfJoining)
      : new Date();

    const teacher = await prisma.teacher.create({
      data: {
        employeeId,
        name,
        qualification,
        dateOfJoining: joiningDate,
        assignedClass: assignedClass || null,
        subjects: subjects || [],
        contact,
        email: email || null,
        aadhaar: aadhaar || null,
        salary: salary ? Number(salary) : null,
        designation: designation || null
      }
    });
    res.status(201).json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const data: any = { ...req.body };
    if (data.dateOfJoining && data.dateOfJoining.trim() !== '') {
      data.dateOfJoining = new Date(data.dateOfJoining);
    } else {
      delete data.dateOfJoining;
    }
    if (data.salary !== undefined) data.salary = data.salary ? Number(data.salary) : null;

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
