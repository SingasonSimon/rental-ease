import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, // 15m
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
};

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            setCookies(res, result.tokens.accessToken, result.tokens.refreshToken);
            return res.status(201).json({ user: result.user });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password);
            setCookies(res, result.tokens.accessToken, result.tokens.refreshToken);
            return res.status(200).json({ user: result.user });
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }

    static async logout(_req: Request, res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logged out successfully' });
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                return res.status(401).json({ error: 'Refresh token required' });
            }
            const result = await AuthService.refreshToken(token);
            setCookies(res, result.tokens.accessToken, result.tokens.refreshToken);
            return res.status(200).json({ user: result.user });
        } catch (error: any) {
             res.clearCookie('accessToken');
             res.clearCookie('refreshToken');
            return res.status(401).json({ error: error.message });
        }
    }

    static async me(req: any, res: Response) {
        return res.status(200).json({ user: req.user });
    }
}
