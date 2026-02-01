import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

router.get('/', MessageController.getMyMessages);
router.get('/:id', MessageController.getMessageById);
router.post('/', MessageController.sendMessage);
router.patch('/:id/read', MessageController.markAsRead);

export default router;
