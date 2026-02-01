import prisma from '../config/database';
import { UnitStatus } from '@prisma/client';

export class UnitService {
    static async getAllUnits(filters: any = {}) {
        const { propertyId, status, minRent, maxRent, bedrooms } = filters;

        return await prisma.unit.findMany({
            where: {
                ...(propertyId && { propertyId }),
                ...(status && { status: status as UnitStatus }),
                ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
                rentAmount: {
                    ...(minRent && { gte: parseFloat(minRent) }),
                    ...(maxRent && { lte: parseFloat(maxRent) }),
                }
            },
            include: {
                property: {
                    select: {
                        name: true,
                        address: true,
                        city: true,
                    }
                },
                images: true,
            }
        });
    }

    static async getUnitById(id: string) {
        return await prisma.unit.findUnique({
            where: { id },
            include: {
                property: true,
                images: true,
            }
        });
    }

    static async createUnit(unitData: any) {
        const { propertyId, unitNumber, bedrooms, bathrooms, squareFootage, rentAmount, securityDeposit, description } = unitData;

        return await prisma.unit.create({
            data: {
                propertyId,
                unitNumber,
                bedrooms: parseInt(bedrooms),
                bathrooms: bathrooms ? parseFloat(bathrooms) : null,
                squareFootage: squareFootage ? parseInt(squareFootage) : null,
                rentAmount: parseFloat(rentAmount),
                securityDeposit: securityDeposit ? parseFloat(securityDeposit) : null,
                description,
            }
        });
    }

    static async updateUnit(id: string, updateData: any) {
        const formattedData = { ...updateData };
        if (updateData.bedrooms) formattedData.bedrooms = parseInt(updateData.bedrooms);
        if (updateData.bathrooms) formattedData.bathrooms = parseFloat(updateData.bathrooms);
        if (updateData.rentAmount) formattedData.rentAmount = parseFloat(updateData.rentAmount);
        if (updateData.securityDeposit) formattedData.securityDeposit = parseFloat(updateData.securityDeposit);

        return await prisma.unit.update({
            where: { id },
            data: formattedData,
        });
    }

    static async deleteUnit(id: string) {
        return await prisma.unit.delete({
            where: { id },
        });
    }
}
