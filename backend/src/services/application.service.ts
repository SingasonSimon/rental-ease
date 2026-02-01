import prisma from '../config/database';
import { ApplicationStatus } from '@prisma/client';

export class ApplicationService {
    static async getAllApplications(filters: any = {}) {
        return await prisma.application.findMany({
            where: filters,
            include: {
                unit: {
                    include: {
                        property: true
                    }
                },
                tenant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        });
    }

    static async getApplicationById(id: string) {
        return await prisma.application.findUnique({
            where: { id },
            include: {
                unit: {
                    include: {
                        property: true
                    }
                },
                tenant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        });
    }

    static async createApplication(data: any) {
        return await prisma.application.create({
            data: {
                unitId: data.unitId,
                tenantId: data.tenantId,
                applicationData: data.applicationData || {},
                status: 'PENDING',
            }
        });
    }

    static async updateApplicationStatus(id: string, status: ApplicationStatus, reviewerId: string, remarks?: string) {
        return await prisma.application.update({
            where: { id },
            data: {
                status,
                reviewedBy: reviewerId,
                reviewedAt: new Date(),
                adminNotes: remarks, // using adminNotes as a general remarks field
            }
        });
    }

    static async getApplicationsByTenant(tenantId: string) {
        return await prisma.application.findMany({
            where: { tenantId },
            include: {
                unit: {
                    include: {
                        property: true
                    }
                }
            }
        });
    }

    static async getApplicationsByUnit(unitId: string) {
        return await prisma.application.findMany({
            where: { unitId },
            include: {
                tenant: true
            }
        });
    }

    static async getApplicationsForLandlord(landlordId: string) {
        return await prisma.application.findMany({
            where: {
                unit: {
                    property: { landlordId }
                }
            },
            include: {
                unit: {
                    include: {
                        property: true
                    }
                },
                tenant: true
            }
        });
    }
}
