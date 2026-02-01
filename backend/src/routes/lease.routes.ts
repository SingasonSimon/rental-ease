import { Router } from 'express';
import { LeaseController } from '../controllers/lease.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

// All roles can list/view their relevant leases
router.get('/', LeaseController.getAllLeases);
router.get('/:id', LeaseController.getLeaseById);

// Admin only management
router.post('/', requireRole('ADMIN'), LeaseController.createLease);
router.put('/:id', requireRole('ADMIN'), LeaseController.updateLease);
router.patch('/:id/terminate', requireRole('ADMIN'), LeaseController.terminateLease);

export default router;
