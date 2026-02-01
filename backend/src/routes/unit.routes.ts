import { Router } from 'express';
import { UnitController } from '../controllers/unit.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

// Publicly searchable units
router.get('/', UnitController.getAllUnits);
router.get('/:id', UnitController.getUnitById);

// Protected unit management
router.use(requireAuth);
router.post('/', requireRole('ADMIN', 'LANDLORD'), UnitController.createUnit);
router.put('/:id', requireRole('ADMIN', 'LANDLORD'), UnitController.updateUnit);
router.delete('/:id', requireRole('ADMIN', 'LANDLORD'), UnitController.deleteUnit);

export default router;
