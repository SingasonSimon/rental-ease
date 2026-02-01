import prisma from '../config/database';

export class NotificationService {
    static async createNotification(userId: string, title: string, message: string, type: string) {
        // Create in-app notification
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
            }
        });

        return notification;
    }

    static async markAsRead(id: string) {
        return await prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });
    }

    static async getNotificationsForUser(userId: string) {
        return await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20
        });
    }
}
