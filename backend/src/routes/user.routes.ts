import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

// Only Admin can access these routes
router.use(requireAuth, requireRole('ADMIN'));

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/landlord', UserController.createLandlord);
router.patch('/:id', UserController.updateUser);
router.patch('/:id/status', UserController.toggleUserStatus);

export default router;
