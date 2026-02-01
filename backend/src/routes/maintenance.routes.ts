import { Router } from 'express';
import { MaintenanceController } from '../controllers/maintenance.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

// All roles can list/view their relevant requests
router.get('/', MaintenanceController.getAllRequests);
router.get('/:id', MaintenanceController.getRequestById);

// Tenant specific
router.post('/', requireRole('TENANT'), MaintenanceController.createRequest);

// Landlord/Admin specific - status updates and assignments
router.patch('/:id/status', requireRole('ADMIN', 'LANDLORD'), MaintenanceController.updateStatus);
router.patch('/:id/assign', requireRole('ADMIN', 'LANDLORD'), MaintenanceController.assignRequest);

// All roles can comment on existing requests
router.post('/:id/comments', MaintenanceController.addComment);

export default router;
