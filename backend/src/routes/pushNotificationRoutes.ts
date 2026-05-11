import { Router } from 'express';
import { subscribe, sendManualNotification, getVapidPublicKey } from '../controllers/pushNotificationController';

const router = Router();

router.get('/key', getVapidPublicKey);
router.post('/subscribe', subscribe);
router.post('/send', sendManualNotification);

export default router;
