import { Request, Response } from 'express';
import prisma from '../prismaClient';

// GET /api/attendance — returns ALL attendance records
export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        student: {
          select: { id: true, name: true, admissionNumber: true, classId: true }
        }
      },
      orderBy: { date: 'desc' }
    });
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/attendance/:studentId — returns attendance for a specific student
export const getAttendanceByStudent = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.findMany({
      where: { studentId: req.params.studentId },
      orderBy: { date: 'desc' }
    });
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/attendance — mark or update attendance for a student
export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({ error: 'studentId, date, and status are required' });
    }

    const attendance = await prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId,
          date: new Date(date)
        }
      },
      update: { status },
      create: {
        studentId,
        date: new Date(date),
        status
      }
    });

    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
