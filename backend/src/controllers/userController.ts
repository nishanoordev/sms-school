import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const user = await prisma.user.create({
      data: { username, password, role }
    });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
