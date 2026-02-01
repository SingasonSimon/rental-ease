import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }

    static async logout(_req: Request, res: Response) {
        // For JWT, logout is usually handled on the frontend by clearing the token.
        // Optionally, you can implement token blacklisting here.
        return res.status(200).json({ message: 'Logged out successfully' });
    }

    static async me(req: any, res: Response) {
        return res.status(200).json({ user: req.user });
    }
}
