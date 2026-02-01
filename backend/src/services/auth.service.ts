import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { Role } from '@prisma/client';

export class AuthService {
    static async register(userData: any) {
        const { email, password, firstName, lastName, role, phone } = userData;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
                role: (role as Role) || Role.TENANT,
                phone,
            },
        });

        // Generate tokens
        const accessToken = generateAccessToken({ userId: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }

    static async login(email: string, password: string) {
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await comparePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        if (!user.isActive) {
            throw new Error('Account is deactivated');
        }

        // Generate tokens
        const accessToken = generateAccessToken({ userId: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }

    static async googleAuth(googleData: {
        email: string;
        firstName: string;
        lastName: string;
        profileImage: string | null;
        googleId: string;
    }) {
        const { email, firstName, lastName, profileImage } = googleData;
        // Note: googleId is available in googleData if needed for linking accounts in the future

        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Create new user from Google data
            // Generate a random password hash (user won't use it, they'll always use Google)
            const randomPassword = Math.random().toString(36).slice(-16);
            const passwordHash = await hashPassword(randomPassword);

            user = await prisma.user.create({
                data: {
                    email,
                    passwordHash,
                    firstName,
                    lastName,
                    profileImage,
                    role: Role.TENANT,
                    emailVerified: true, // Google emails are verified
                    isActive: true,
                },
            });
        }

        if (!user.isActive) {
            throw new Error('Account is deactivated');
        }

        // Generate tokens
        const accessToken = generateAccessToken({ userId: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }

    static async refreshToken(token: string) {
        const payload = verifyRefreshToken(token);
        if (!payload) {
            throw new Error('Invalid refresh token');
        }

        const user = await prisma.user.findUnique({ where: { id: payload.userId } });
        if (!user || !user.isActive) {
            throw new Error('User not found or inactive');
        }

        const accessToken = generateAccessToken({ userId: user.id, role: user.role });
        const newRefreshToken = generateRefreshToken({ userId: user.id, role: user.role });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            tokens: {
                accessToken,
                refreshToken: newRefreshToken,
            },
        };
    }
}
