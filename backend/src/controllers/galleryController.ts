import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllGalleryItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const { title, imageUrl, category, description } = req.body;
    const item = await prisma.galleryItem.create({
      data: { title, imageUrl, category, description }
    });
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.galleryItem.delete({
      where: { id }
    });
    res.json({ message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
