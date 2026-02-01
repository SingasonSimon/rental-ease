import { Router } from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

// All roles can list/view their relevant applications
router.get('/', ApplicationController.getAllApplications);
router.get('/:id', ApplicationController.getApplicationById);

// Tenant specific
router.post('/', requireRole('TENANT'), ApplicationController.submitApplication);

// Landlord specific - review and add notes
router.patch('/:id/review', requireRole('LANDLORD'), ApplicationController.reviewApplication);

// Admin specific - final approval/rejection
router.patch('/:id/approve', requireRole('ADMIN'), ApplicationController.approveApplication);
router.patch('/:id/reject', requireRole('ADMIN'), ApplicationController.rejectApplication);

export default router;
