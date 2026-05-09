import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAttendanceByStudent = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.findMany({
      where: { studentId: req.params.studentId }
    });
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId, date, status } = req.body;
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
