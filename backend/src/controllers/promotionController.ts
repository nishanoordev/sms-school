import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const promoteStudents = async (req: Request, res: Response) => {
  try {
    const { fromClass, toClass, studentIds } = req.body;

    if (!fromClass || !toClass || !studentIds || !Array.isArray(studentIds)) {
      return res.status(400).json({ error: 'Missing required promotion data' });
    }

    // Update students in bulk
    const result = await prisma.student.updateMany({
      where: {
        id: { in: studentIds },
        classId: fromClass
      },
      data: {
        classId: toClass,
        status: 'Active' // Reset status just in case
      }
    });

    res.json({ message: `Successfully promoted ${result.count} students to ${toClass}`, count: result.count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
