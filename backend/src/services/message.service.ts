import prisma from '../config/database';

export class MessageService {
    static async getMessagesForUser(userId: string) {
        return await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async getMessageById(id: string) {
        return await prisma.message.findUnique({
            where: { id },
            include: {
                sender: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                    }
                }
            }
        });
    }

    static async sendMessage(senderId: string, receiverId: string, subject: string | undefined, body: string) {
        return await prisma.message.create({
            data: {
                senderId,
                receiverId,
                subject,
                body,
            }
        });
    }

    static async markAsRead(id: string) {
        return await prisma.message.update({
            where: { id },
            data: { isRead: true }
        });
    }
}
