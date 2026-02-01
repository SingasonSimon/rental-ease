import { Response } from 'express';
import { ApplicationService } from '../services/application.service';
import { AuthRequest } from '../middleware/auth';
import { ApplicationStatus } from '@prisma/client';

export class ApplicationController {
    static async submitApplication(req: AuthRequest, res: Response) {
        try {
            const applicationData = {
                ...req.body,
                tenantId: req.user!.userId,
            };
            const application = await ApplicationService.createApplication(applicationData);
            return res.status(201).json(application);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getApplicationById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const application = await ApplicationService.getApplicationById(id);
            if (!application) return res.status(404).json({ error: 'Application not found' });

            if (req.user!.role === 'TENANT' && application.tenantId !== req.user!.userId) {
                return res.status(403).json({ error: 'Access denied' });
            }

            return res.status(200).json(application);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getMyApplications(req: AuthRequest, res: Response) {
        try {
            const applications = await ApplicationService.getApplicationsByTenant(req.user!.userId);
            return res.status(200).json(applications);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateStatus(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const { status, remarks } = req.body;
            const updated = await ApplicationService.updateApplicationStatus(
                id,
                status as ApplicationStatus,
                req.user!.userId,
                remarks
            );
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async reviewApplication(req: AuthRequest, res: Response) {
        return this.updateStatus(req, res);
    }

    static async approveApplication(req: AuthRequest, res: Response) {
        req.body.status = 'APPROVED';
        return this.updateStatus(req, res);
    }

    static async rejectApplication(req: AuthRequest, res: Response) {
        req.body.status = 'REJECTED';
        return this.updateStatus(req, res);
    }

    static async getLandlordApplications(req: AuthRequest, res: Response) {
        try {
            const landlordId = req.params.landlordId as string;
            if (req.user!.role !== 'ADMIN' && req.user!.userId !== landlordId) {
                return res.status(403).json({ error: 'Access denied' });
            }
            const applications = await ApplicationService.getApplicationsForLandlord(landlordId);
            return res.status(200).json(applications);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getUnitApplications(req: AuthRequest, res: Response) {
        try {
            const unitId = req.params.unitId as string;
            const applications = await ApplicationService.getApplicationsByUnit(unitId);
            return res.status(200).json(applications);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAllApplications(req: AuthRequest, res: Response) {
        try {
            const filters = req.query;
            const applications = await ApplicationService.getAllApplications(filters);
            return res.status(200).json(applications);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
