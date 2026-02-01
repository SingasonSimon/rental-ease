import { Response } from 'express';
import { UnitService } from '../services/unit.service';
import { AuthRequest } from '../middleware/auth';

export class UnitController {
    static async getAllUnits(req: AuthRequest, res: Response) {
        try {
            const filters = req.query;
            const units = await UnitService.getAllUnits(filters);
            return res.status(200).json(units);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getUnitById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const unit = await UnitService.getUnitById(id);
            if (!unit) return res.status(404).json({ error: 'Unit not found' });
            return res.status(200).json(unit);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async createUnit(req: AuthRequest, res: Response) {
        try {
            const unit = await UnitService.createUnit(req.body);
            return res.status(201).json(unit);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async updateUnit(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const updated = await UnitService.updateUnit(id, req.body);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deleteUnit(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            await UnitService.deleteUnit(id);
            return res.status(200).json({ message: 'Unit deleted successfully' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
