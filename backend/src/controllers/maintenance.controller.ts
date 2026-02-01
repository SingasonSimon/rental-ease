import { Response } from 'express';
import { MaintenanceService } from '../services/maintenance.service';
import { AuthRequest } from '../middleware/auth';
import { MaintenanceStatus } from '@prisma/client';

export class MaintenanceController {
    static async createRequest(req: AuthRequest, res: Response) {
        try {
            const requestData = {
                ...req.body,
                tenantId: req.user!.userId,
            };
            const request = await MaintenanceService.createRequest(requestData);
            return res.status(201).json(request);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getRequestById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const request = await MaintenanceService.getRequestById(id);
            if (!request) return res.status(404).json({ error: 'Request not found' });

            // Authorization check
            if (req.user!.role === 'TENANT' && request.tenantId !== req.user!.userId) {
                return res.status(403).json({ error: 'Access denied' });
            }

            return res.status(200).json(request);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getMyRequests(req: AuthRequest, res: Response) {
        try {
            const requests = await MaintenanceService.getRequestsByTenant(req.user!.userId);
            return res.status(200).json(requests);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateStatus(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const { status } = req.body;
            const updated = await MaintenanceService.updateStatus(id, status as MaintenanceStatus);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async assignRequest(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const { assigneeId } = req.body;
            const updated = await MaintenanceService.assignRequest(id, assigneeId);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async addComment(req: AuthRequest, res: Response) {
        try {
            const requestId = req.params.id as string;
            const { comment } = req.body;
            const newComment = await MaintenanceService.addComment(requestId, req.user!.userId, comment);
            return res.status(201).json(newComment);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAllRequests(req: AuthRequest, res: Response) {
        try {
            const filters = req.query;
            const requests = await MaintenanceService.getAllRequests(filters);
            return res.status(200).json(requests);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
