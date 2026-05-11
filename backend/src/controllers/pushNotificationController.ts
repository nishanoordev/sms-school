import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { sendNotificationToAll } from '../utils/notificationUtils';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { endpoint, keys } = req.body;
    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    const subscription = await prisma.pushSubscription.upsert({
      where: { endpoint },
      update: {
        p256dh: keys.p256dh,
        auth: keys.auth
      },
      create: {
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth
      }
    });

    res.status(201).json(subscription);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const sendManualNotification = async (req: Request, res: Response) => {
  try {
    const { title, body, url } = req.body;
    await sendNotificationToAll({ title, body, url: url || '/' });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVapidPublicKey = (req: Request, res: Response) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
};
