import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllSalaryRecords = async (req: Request, res: Response) => {
  try {
    const records = await prisma.salaryRecord.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(records);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createSalaryRecord = async (req: Request, res: Response) => {
  try {
    const record = await prisma.salaryRecord.create({ data: req.body });
    res.status(201).json(record);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateSalaryStatus = async (req: Request, res: Response) => {
  try {
    const record = await prisma.salaryRecord.update({
      where: { id: req.params.id },
      data: { status: req.body.status, paidDate: req.body.paidDate }
    });
    res.json(record);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
