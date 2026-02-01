import prisma from '../config/database';
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

export class UserService {
    static async getAllUsers(filters: any = {}) {
        return await prisma.user.findMany({
            where: filters,
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                phone: true,
                profileImage: true,
                emailVerified: true,
                isActive: true,
                createdAt: true,
            }
        });
    }

    static async getUserById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                phone: true,
                profileImage: true,
                emailVerified: true,
                isActive: true,
                createdAt: true,
            }
        });
    }

    static async createLandlord(userData: any) {
        const { email, password, firstName, lastName, phone } = userData;
        const passwordHash = await bcrypt.hash(password, 10);

        return await prisma.user.create({
            data: {
                email,
                passwordHash,
                role: Role.LANDLORD,
                firstName,
                lastName,
                phone,
            }
        });
    }

    static async updateUser(id: string, updateData: any) {
        // If updating password, hash it
        if (updateData.password) {
            updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
            delete updateData.password;
        }

        return await prisma.user.update({
            where: { id },
            data: updateData,
        });
    }

    static async toggleUserStatus(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error('User not found');

        return await prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive }
        });
    }
}
