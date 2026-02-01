import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth';

export class UserController {
    static async getAllUsers(_req: AuthRequest, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const user = await UserService.getUserById(id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async createLandlord(req: AuthRequest, res: Response) {
        try {
            const user = await UserService.createLandlord(req.body);
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const user = await UserService.updateUser(id, req.body);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async toggleUserStatus(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const user = await UserService.toggleUserStatus(id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
