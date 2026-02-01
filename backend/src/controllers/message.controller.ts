import { Response } from 'express';
import { MessageService } from '../services/message.service';
import { AuthRequest } from '../middleware/auth';

export class MessageController {
    static async getMyMessages(req: AuthRequest, res: Response) {
        try {
            const messages = await MessageService.getMessagesForUser(req.user!.userId);
            return res.status(200).json(messages);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getMessageById(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const message = await MessageService.getMessageById(id);
            if (!message) return res.status(404).json({ error: 'Message not found' });

            // Authorization check
            if (message.senderId !== req.user!.userId && message.receiverId !== req.user!.userId) {
                return res.status(403).json({ error: 'Access denied' });
            }

            return res.status(200).json(message);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async sendMessage(req: AuthRequest, res: Response) {
        try {
            const { receiverId, subject, body } = req.body;
            const message = await MessageService.sendMessage(req.user!.userId, receiverId, subject, body);
            return res.status(201).json(message);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async markAsRead(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;
            const message = await MessageService.getMessageById(id);
            if (!message) return res.status(404).json({ error: 'Message not found' });

            if (message.receiverId !== req.user!.userId) {
                return res.status(403).json({ error: 'Only the receiver can mark message as read' });
            }

            const updated = await MessageService.markAsRead(id);
            return res.status(200).json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
