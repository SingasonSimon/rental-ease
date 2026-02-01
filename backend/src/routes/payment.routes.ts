import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

// Public callback (no auth because it's called by Safaricom)
router.post('/callback', PaymentController.mpesaCallback);

// Protected routes
router.use(requireAuth);

// Tenants can initiate payments and see their history
router.post('/stkpush', requireRole('TENANT'), PaymentController.initiatePayment);
router.get('/my', requireRole('TENANT'), PaymentController.getMyPayments);

// Admins and Landlords can see all/filtered payments
router.get('/', requireRole('ADMIN', 'LANDLORD'), PaymentController.getAllPayments);

export default router;
