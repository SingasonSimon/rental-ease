import prisma from '../config/database';

export class PropertyService {
    static async getAllProperties(filters: any = {}) {
        const { landlordId, isActive, city } = filters;

        return await prisma.property.findMany({
            where: {
                ...(landlordId && { landlordId }),
                ...(isActive !== undefined && { isActive: isActive === 'true' }),
                ...(city && { city: { contains: city, mode: 'insensitive' } }),
            },
            include: {
                landlord: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                _count: {
                    select: { units: true }
                },
                images: true,
            }
        });
    }

    static async getPropertyById(id: string) {
        return await prisma.property.findUnique({
            where: { id },
            include: {
                landlord: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                units: true,
                images: true,
            }
        });
    }

    static async createProperty(propertyData: any) {
        const { name, address, city, description, amenities, landlordId, createdBy } = propertyData;

        return await prisma.property.create({
            data: {
                name,
                address,
                city,
                description,
                amenities: amenities || [],
                landlordId,
                createdBy,
            }
        });
    }

    static async updateProperty(id: string, updateData: any) {
        return await prisma.property.update({
            where: { id },
            data: updateData
        });
    }

    static async deleteProperty(id: string) {
        // Note: Due to Cascade delete in schema, this will also delete units and images
        return await prisma.property.delete({
            where: { id }
        });
    }
}
