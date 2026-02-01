import { Response } from 'express';
import { PropertyService } from '../services/property.service';
import { AuthRequest } from '../middleware/auth';

export class PropertyController {
    static async getAllProperties(req: AuthRequest, res: Response) {
        try {
            const filters = req.query;
            const properties = await PropertyService.getAllProperties(filters);
            return res.status(200).json(properties);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getPropertyById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const property = await PropertyService.getPropertyById(id);
            if (!property) return res.status(404).json({ error: 'Property not found' });
            return res.status(200).json(property);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async createProperty(req: AuthRequest, res: Response) {
        try {
            const propertyData = {
                ...req.body,
                landlordId: req.user!.role === 'ADMIN' ? req.body.landlordId : req.user!.userId,
                createdBy: req.user!.userId,
            };
            const property = await PropertyService.createProperty(propertyData);
            return res.status(201).json(property);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async updateProperty(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const updated = await PropertyService.updateProperty(id, req.body);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deleteProperty(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            await PropertyService.deleteProperty(id);
            return res.status(200).json({ message: 'Property deleted successfully' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
