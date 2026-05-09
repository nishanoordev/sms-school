import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllFeeReceipts = async (req: Request, res: Response) => {
  try {
    const receipts = await prisma.feeReceipt.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(receipts);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createFeeReceipt = async (req: Request, res: Response) => {
  try {
    const receipt = await prisma.feeReceipt.create({ data: req.body });
    res.status(201).json(receipt);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const getFeeReceiptsByStudent = async (req: Request, res: Response) => {
  try {
    const receipts = await prisma.feeReceipt.findMany({
      where: { studentId: req.params.studentId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(receipts);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
