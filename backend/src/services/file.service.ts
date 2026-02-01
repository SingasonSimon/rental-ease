import prisma from '../config/database';

export class FileService {
    static async addPropertyImage(propertyId: string, url: string, publicId: string) {
        return await prisma.propertyImage.create({
            data: {
                propertyId,
                url,
                publicId,
            }
        });
    }

    static async addUnitImage(unitId: string, url: string, publicId: string) {
        return await prisma.unitImage.create({
            data: {
                unitId,
                url,
                publicId,
            }
        });
    }

    static async updateUserProfileImage(userId: string, url: string) {
        return await prisma.user.update({
            where: { id: userId },
            data: { profileImage: url }
        });
    }

    static async deletePropertyImage(id: string) {
        return await prisma.propertyImage.delete({
            where: { id }
        });
    }

    static async deleteUnitImage(id: string) {
        return await prisma.unitImage.delete({
            where: { id }
        });
    }
}
