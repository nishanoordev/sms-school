import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllLeaveRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.leaveRequest.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(requests);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createLeaveRequest = async (req: Request, res: Response) => {
  try {
    const leave = await prisma.leaveRequest.create({ data: req.body });
    res.status(201).json(leave);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateLeaveStatus = async (req: Request, res: Response) => {
  try {
    const leave = await prisma.leaveRequest.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(leave);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};
