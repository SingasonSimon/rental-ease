import prisma from '../config/database';
import { MaintenanceStatus, Priority } from '@prisma/client';

export class MaintenanceService {
    static async getAllRequests(filters: any = {}) {
        const { status, priority, unitId, tenantId, propertyId } = filters;

        return await prisma.maintenanceRequest.findMany({
            where: {
                ...(status && { status: status as MaintenanceStatus }),
                ...(priority && { priority: priority as Priority }),
                ...(unitId && { unitId }),
                ...(tenantId && { tenantId }),
                ...(propertyId && {
                    unit: { propertyId }
                })
            },
            include: {
                unit: {
                    include: { property: true }
                },
                tenant: {
                    select: { firstName: true, lastName: true, email: true }
                },
                assignee: {
                    select: { firstName: true, lastName: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async getRequestById(id: string) {
        return await prisma.maintenanceRequest.findUnique({
            where: { id },
            include: {
                unit: {
                    include: { property: true }
                },
                tenant: {
                    select: { id: true, firstName: true, lastName: true, email: true }
                },
                assignee: {
                    select: { id: true, firstName: true, lastName: true }
                },
                comments: {
                    include: {
                        user: {
                            select: { firstName: true, lastName: true, role: true }
                        }
                    },
                    orderBy: { createdAt: 'asc' }
                }
            }
        });
    }

    static async createRequest(data: any) {
        const { unitId, tenantId, category, description, priority } = data;

        return await prisma.maintenanceRequest.create({
            data: {
                unitId,
                tenantId,
                category,
                description,
                priority: (priority as Priority) || 'MEDIUM',
            }
        });
    }

    static async updateStatus(id: string, status: MaintenanceStatus) {
        const updateData: any = { status };
        if (status === 'COMPLETED') {
            updateData.completedAt = new Date();
        }

        return await prisma.maintenanceRequest.update({
            where: { id },
            data: updateData
        });
    }

    static async assignRequest(id: string, assigneeId: string) {
        return await prisma.maintenanceRequest.update({
            where: { id },
            data: {
                assignedTo: assigneeId,
                status: 'IN_PROGRESS'
            }
        });
    }

    static async addComment(requestId: string, userId: string, comment: string) {
        return await prisma.maintenanceComment.create({
            data: {
                requestId,
                userId,
                comment,
            }
        });
    }

    static async getRequestsByTenant(tenantId: string) {
        return await prisma.maintenanceRequest.findMany({
            where: { tenantId },
            include: {
                unit: { include: { property: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
