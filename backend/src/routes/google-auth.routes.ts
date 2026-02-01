import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../services/auth.service';
import { body, validationResult } from 'express-validator';

const router = Router();

// Google OAuth callback
router.post(
    '/google',
    [body('credential').notEmpty().withMessage('Google credential is required')],
    async (req: any, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { credential } = req.body;

            // Verify Google token
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            if (!payload) {
                return res.status(400).json({ message: 'Invalid Google token' });
            }

            const { email, given_name, family_name, picture, sub: googleId } = payload;

            if (!email) {
                return res.status(400).json({ message: 'Email not found in Google token' });
            }

            // Login or register with Google
            const result = await AuthService.googleAuth({
                email,
                firstName: given_name || '',
                lastName: family_name || '',
                profileImage: picture || null,
                googleId,
            });

            res.json(result);
        } catch (error: any) {
            console.error('Google auth error:', error);
            res.status(500).json({ message: error.message || 'Google authentication failed' });
        }
    }
);

export default router;
