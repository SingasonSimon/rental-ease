import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

// All authenticated users can list properties (role-based filtering in controller)
router.get('/', PropertyController.getAllProperties);
router.get('/:id', PropertyController.getPropertyById);

// Landlords and Admins can create/edit/delete
router.post('/', requireRole('ADMIN', 'LANDLORD'), PropertyController.createProperty);
router.put('/:id', requireRole('ADMIN', 'LANDLORD'), PropertyController.updateProperty);
router.delete('/:id', requireRole('ADMIN', 'LANDLORD'), PropertyController.deleteProperty);

export default router;
