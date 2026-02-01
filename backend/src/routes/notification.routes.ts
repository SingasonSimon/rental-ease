import { Router, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { NotificationService } from '../services/notification.service';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const notifications = await NotificationService.getNotificationsForUser(userId);
        return res.status(200).json(notifications);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/:id/read', async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const updated = await NotificationService.markAsRead(id);
        return res.status(200).json(updated);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;
