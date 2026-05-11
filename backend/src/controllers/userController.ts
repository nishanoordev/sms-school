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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    // Find user by username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    // Check password (plain text — upgrade to bcrypt in production)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    // Optional: validate role matches
    if (role && user.role !== role && user.role !== 'admin') {
      return res.status(403).json({ success: false, message: `This account does not have ${role} access.` });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

