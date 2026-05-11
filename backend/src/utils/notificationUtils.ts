import webpush from 'web-push';
import prisma from '../prismaClient';
import dotenv from 'dotenv';

dotenv.config();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY || '';
const privateVapidKey = process.env.VAPID_PRIVATE_KEY || '';

if (publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails(
    'mailto:admin@example.com',
    publicVapidKey,
    privateVapidKey
  );
}

interface NotificationPayload {
  title: string;
  body: string;
  url?: string;
}

export const sendNotificationToAll = async (payload: NotificationPayload) => {
  console.log(`[Push] Sending notification to all: ${payload.title}`);
  try {
    const subscriptions = await prisma.pushSubscription.findMany();
    console.log(`[Push] Found ${subscriptions.length} subscriptions`);
    
    const results = await Promise.allSettled(
      subscriptions.map(sub => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };
        return webpush.sendNotification(pushSubscription, JSON.stringify(payload))
          .catch(err => {
            if (err.statusCode === 410 || err.statusCode === 404) {
              // Subscription has expired or is no longer valid
              return prisma.pushSubscription.delete({ where: { id: sub.id } });
            }
            throw err;
          });
      })
    );
    
    const success = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    console.log(`[Push] Sent. Success: ${success}, Failed: ${failed}`);
  } catch (error) {
    console.error('[Push] Fatal error sending notifications:', error);
  }
};
