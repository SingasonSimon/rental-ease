import { Response } from 'express';
import { LeaseService } from '../services/lease.service';
import { AuthRequest } from '../middleware/auth';

export class LeaseController {
    static async createLease(req: AuthRequest, res: Response) {
        try {
            const leaseData = {
                ...req.body,
                createdBy: req.user!.userId,
            };
            const lease = await LeaseService.createLease(leaseData);
            return res.status(201).json(lease);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getLeaseById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const lease = await LeaseService.getLeaseById(id);
            if (!lease) return res.status(404).json({ error: 'Lease not found' });

            if (req.user!.role === 'TENANT' && lease.tenantId !== req.user!.userId) {
                return res.status(403).json({ error: 'Access denied' });
            }

            return res.status(200).json(lease);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getMyLeases(req: AuthRequest, res: Response) {
        try {
            const leases = await LeaseService.getLeasesByTenant(req.user!.userId);
            return res.status(200).json(leases);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateLease(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const updated = await LeaseService.updateLease(id, req.body);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async terminateLease(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const updated = await LeaseService.terminateLease(id);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAllLeases(req: AuthRequest, res: Response) {
        try {
            const filters = req.query;
            const leases = await LeaseService.getAllLeases(filters);
            return res.status(200).json(leases);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
