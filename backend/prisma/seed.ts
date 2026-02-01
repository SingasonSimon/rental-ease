import { PrismaClient, Role, UnitStatus, LeaseStatus, PaymentStatus, PaymentFrequency } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

async function main() {
    console.log('[SEED] Starting database seed...');

    // Clean up existing data
    console.log('[SEED] Cleaning up existing data...');
    try {
        await prisma.maintenanceComment.deleteMany();
        await prisma.maintenanceRequest.deleteMany();
        await prisma.message.deleteMany();
        await prisma.notification.deleteMany();
        await prisma.payment.deleteMany();
        await prisma.lease.deleteMany();
        await prisma.application.deleteMany();
        await prisma.unitImage.deleteMany();
        await prisma.unit.deleteMany();
        await prisma.propertyImage.deleteMany();
        await prisma.property.deleteMany();
        await prisma.user.deleteMany();
    } catch (error) {
        console.warn('[SEED] Warning: Cleanup failed (tables might be empty or connection issue)', error);
    }

    // ==================== USERS ====================
    console.log('[SEED] Creating users...');

    const adminPassword = await hashPassword('admin123');
    const landlordPassword = await hashPassword('landlord123');
    const tenantPassword = await hashPassword('tenant123');

    const admin = await prisma.user.create({
        data: {
            email: 'admin@rental.com',
            passwordHash: adminPassword,
            role: Role.ADMIN,
            firstName: 'System',
            lastName: 'Administrator',
            phone: '+254700000001',
            emailVerified: true,
            isActive: true,
        },
    });

    const landlord1 = await prisma.user.create({
        data: {
            email: 'john.kamau@rental.com',
            passwordHash: landlordPassword,
            role: Role.LANDLORD,
            firstName: 'John',
            lastName: 'Kamau',
            phone: '+254712345678',
            emailVerified: true,
            isActive: true,
        },
    });

    const landlord2 = await prisma.user.create({
        data: {
            email: 'grace.properties@rental.com',
            passwordHash: landlordPassword,
            role: Role.LANDLORD,
            firstName: 'Grace',
            lastName: 'Wanjiru',
            phone: '+254722456789',
            emailVerified: true,
            isActive: true,
        },
    });

    const tenant1 = await prisma.user.create({
        data: {
            email: 'jane.mwangi@example.com',
            passwordHash: tenantPassword,
            role: Role.TENANT,
            firstName: 'Jane',
            lastName: 'Mwangi',
            phone: '+254733567890',
            emailVerified: true,
            isActive: true,
        },
    });

    const tenant2 = await prisma.user.create({
        data: {
            email: 'peter.ochieng@example.com',
            passwordHash: tenantPassword,
            role: Role.TENANT,
            firstName: 'Peter',
            lastName: 'Ochieng',
            phone: '+254744678901',
            emailVerified: true,
            isActive: true,
        },
    });

    await prisma.user.create({
        data: {
            email: 'mary.wanjiku@example.com',
            passwordHash: tenantPassword,
            role: Role.TENANT,
            firstName: 'Mary',
            lastName: 'Wanjiku',
            phone: '+254755789012',
            emailVerified: true,
            isActive: true,
        },
    });

    await prisma.user.create({
        data: {
            email: 'samuel.njoroge@example.com',
            passwordHash: tenantPassword,
            role: Role.TENANT,
            firstName: 'Samuel',
            lastName: 'Njoroge',
            phone: '+254766890123',
            emailVerified: true,
            isActive: true,
        },
    });

    console.log('   - Created 7 users');

    // ==================== PROPERTIES ====================
    console.log('[SEED] Creating properties...');

    const property1 = await prisma.property.create({
        data: {
            name: 'Kileleshwa Heights',
            address: 'Othaya Road, Kileleshwa',
            city: 'Nairobi',
            description: 'Modern apartment complex with 24/7 security, parking, and gym.',
            amenities: ['Gym', 'Swimming Pool', '24/7 Security', 'Parking', 'Elevator'],
            landlordId: landlord1.id,
            createdBy: admin.id,
            isActive: true,
        },
    });

    const property2 = await prisma.property.create({
        data: {
            name: 'Westlands Prime',
            address: 'Waiyaki Way, Westlands',
            city: 'Nairobi',
            description: 'Premium apartments with city views.',
            amenities: ['Rooftop', '24/7 Security', 'Parking', 'Fiber Internet'],
            landlordId: landlord2.id,
            createdBy: admin.id,
            isActive: true,
        },
    });

    console.log('   - Created 2 properties');

    // ==================== UNITS ====================
    console.log('[SEED] Creating units...');

    const unit1 = await prisma.unit.create({
        data: {
            propertyId: property1.id,
            unitNumber: 'A-101',
            bedrooms: 1,
            bathrooms: 1,
            squareFootage: 550,
            rentAmount: 45000,
            securityDeposit: 90000,
            status: UnitStatus.OCCUPIED,
            description: '1-bedroom apartment with balcony.',
        },
    });

    await prisma.unit.create({
        data: {
            propertyId: property1.id,
            unitNumber: 'A-201',
            bedrooms: 2,
            bathrooms: 1,
            squareFootage: 850,
            rentAmount: 65000,
            securityDeposit: 130000,
            status: UnitStatus.AVAILABLE,
            description: '2-bedroom apartment.',
        },
    });

    const unit3 = await prisma.unit.create({
        data: {
            propertyId: property2.id,
            unitNumber: 'B-101',
            bedrooms: 3,
            bathrooms: 2,
            squareFootage: 1100,
            rentAmount: 120000,
            securityDeposit: 240000,
            status: UnitStatus.OCCUPIED,
            description: '3-bedroom executive apartment.',
        },
    });

    console.log('   - Created 3 units');

    // ==================== LEASES ====================
    console.log('[SEED] Creating leases...');

    const lease1 = await prisma.lease.create({
        data: {
            unitId: unit1.id,
            tenantId: tenant1.id,
            startDate: new Date('2025-06-01'),
            endDate: new Date('2026-05-31'),
            rentAmount: 45000,
            securityDeposit: 90000,
            paymentFrequency: PaymentFrequency.MONTHLY,
            status: LeaseStatus.ACTIVE,
            terms: 'Standard 1-year lease.',
            createdBy: admin.id,
        },
    });

    const lease2 = await prisma.lease.create({
        data: {
            unitId: unit3.id,
            tenantId: tenant2.id,
            startDate: new Date('2025-03-01'),
            endDate: new Date('2026-02-28'),
            rentAmount: 120000,
            securityDeposit: 240000,
            paymentFrequency: PaymentFrequency.MONTHLY,
            status: LeaseStatus.ACTIVE,
            terms: 'Corporate lease.',
            createdBy: admin.id,
        },
    });

    console.log('   - Created 2 leases');

    // ==================== PAYMENTS ====================
    console.log('[SEED] Creating payments...');

    await prisma.payment.createMany({
        data: [
            { leaseId: lease1.id, tenantId: tenant1.id, amount: 45000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ1234567', phoneNumber: '+254733567890', paidAt: new Date('2026-01-05'), processedBy: admin.id },
            { leaseId: lease2.id, tenantId: tenant2.id, amount: 120000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ3456789', phoneNumber: '+254744678901', paidAt: new Date('2026-01-01'), processedBy: admin.id },
        ],
    });

    console.log('   - Created 2 payments');

    console.log('\n[SEED] Completed successfully!');
    console.log('\nLogin Credentials:');
    console.log('   Admin:    admin@rental.com / admin123');
    console.log('   Landlord: john.kamau@rental.com / landlord123');
    console.log('   Tenant:   jane.mwangi@example.com / tenant123');
}

main()
    .catch((e) => {
        console.error('[SEED] Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
