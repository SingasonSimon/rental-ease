import { PrismaClient, Role, UnitStatus, ApplicationStatus, LeaseStatus, PaymentStatus, Priority, MaintenanceStatus, PaymentFrequency } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || '';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: ['error', 'query'],
});

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

async function main() {
    console.log('🌱 Starting database seed...');

    // Clean up existing data
    console.log('🧹 Cleaning up existing data...');
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

    // ==================== USERS ====================
    console.log('👥 Creating users...');

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

    const tenant3 = await prisma.user.create({
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

    const tenant4 = await prisma.user.create({
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

    console.log(`   ✓ Created ${7} users`);

    // ==================== PROPERTIES ====================
    console.log('🏢 Creating properties...');

    const property1 = await prisma.property.create({
        data: {
            name: 'Kileleshwa Heights',
            address: 'Othaya Road, Kileleshwa',
            city: 'Nairobi',
            description: 'Modern apartment complex in the heart of Kileleshwa with excellent amenities including 24/7 security, parking, and a gym.',
            amenities: ['Gym', 'Swimming Pool', '24/7 Security', 'Parking', 'Elevator', 'Backup Generator'],
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
            description: 'Premium apartments located in Westlands business district with stunning city views and modern finishes.',
            amenities: ['Rooftop Lounge', '24/7 Security', 'Parking', 'Elevator', 'Fiber Internet'],
            landlordId: landlord2.id,
            createdBy: admin.id,
            isActive: true,
        },
    });

    const property3 = await prisma.property.create({
        data: {
            name: 'Lavington Gardens',
            address: 'James Gichuru Road, Lavington',
            city: 'Nairobi',
            description: 'Luxurious townhouses in serene Lavington, perfect for families seeking space and comfort.',
            amenities: ['Garden', 'Playground', '24/7 Security', 'Parking', 'Servant Quarters'],
            landlordId: landlord1.id,
            createdBy: admin.id,
            isActive: true,
        },
    });

    const property4 = await prisma.property.create({
        data: {
            name: 'Kilimani Suites',
            address: 'Argwings Kodhek Road, Kilimani',
            city: 'Nairobi',
            description: 'Contemporary studio and one-bedroom apartments ideal for young professionals.',
            amenities: ['Gym', 'Co-working Space', '24/7 Security', 'Parking'],
            landlordId: landlord2.id,
            createdBy: admin.id,
            isActive: true,
        },
    });

    console.log(`   ✓ Created ${4} properties`);

    // ==================== PROPERTY IMAGES ====================
    console.log('🖼️ Creating property images...');

    await prisma.propertyImage.createMany({
        data: [
            { propertyId: property1.id, url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', isPrimary: true },
            { propertyId: property1.id, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', isPrimary: false },
            { propertyId: property2.id, url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', isPrimary: true },
            { propertyId: property2.id, url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', isPrimary: false },
            { propertyId: property3.id, url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', isPrimary: true },
            { propertyId: property4.id, url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', isPrimary: true },
        ],
    });

    console.log(`   ✓ Created 6 property images`);

    // ==================== UNITS ====================
    console.log('🚪 Creating units...');

    // Kileleshwa Heights Units
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
            description: 'Cozy 1-bedroom apartment on the ground floor with a private balcony.',
        },
    });

    const unit2 = await prisma.unit.create({
        data: {
            propertyId: property1.id,
            unitNumber: 'A-201',
            bedrooms: 2,
            bathrooms: 1,
            squareFootage: 850,
            rentAmount: 65000,
            securityDeposit: 130000,
            status: UnitStatus.OCCUPIED,
            description: 'Spacious 2-bedroom apartment with modern kitchen and living area.',
        },
    });

    const unit3 = await prisma.unit.create({
        data: {
            propertyId: property1.id,
            unitNumber: 'A-202',
            bedrooms: 2,
            bathrooms: 2,
            squareFootage: 900,
            rentAmount: 75000,
            securityDeposit: 150000,
            status: UnitStatus.AVAILABLE,
            description: 'Corner unit with extra natural light and master ensuite.',
        },
    });

    const unit4 = await prisma.unit.create({
        data: {
            propertyId: property1.id,
            unitNumber: 'A-301',
            bedrooms: 3,
            bathrooms: 2,
            squareFootage: 1200,
            rentAmount: 95000,
            securityDeposit: 190000,
            status: UnitStatus.AVAILABLE,
            description: 'Penthouse with rooftop access and panoramic views.',
        },
    });

    // Westlands Prime Units
    const unit5 = await prisma.unit.create({
        data: {
            propertyId: property2.id,
            unitNumber: 'B-101',
            bedrooms: 3,
            bathrooms: 2,
            squareFootage: 1100,
            rentAmount: 120000,
            securityDeposit: 240000,
            status: UnitStatus.OCCUPIED,
            description: 'Executive 3-bedroom apartment with home office space.',
        },
    });

    const unit6 = await prisma.unit.create({
        data: {
            propertyId: property2.id,
            unitNumber: 'B-102',
            bedrooms: 2,
            bathrooms: 2,
            squareFootage: 950,
            rentAmount: 95000,
            securityDeposit: 190000,
            status: UnitStatus.AVAILABLE,
            description: 'Modern 2-bedroom with open floor plan and city views.',
        },
    });

    // Lavington Gardens Units
    const unit7 = await prisma.unit.create({
        data: {
            propertyId: property3.id,
            unitNumber: 'TH-01',
            bedrooms: 4,
            bathrooms: 3,
            squareFootage: 2500,
            rentAmount: 180000,
            securityDeposit: 360000,
            status: UnitStatus.OCCUPIED,
            description: '4-bedroom townhouse with private garden and servant quarters.',
        },
    });

    const unit8 = await prisma.unit.create({
        data: {
            propertyId: property3.id,
            unitNumber: 'TH-02',
            bedrooms: 4,
            bathrooms: 3,
            squareFootage: 2500,
            rentAmount: 180000,
            securityDeposit: 360000,
            status: UnitStatus.AVAILABLE,
            description: 'Identical townhouse, corner lot with extra parking.',
        },
    });

    // Kilimani Suites Units
    const unit9 = await prisma.unit.create({
        data: {
            propertyId: property4.id,
            unitNumber: 'S-101',
            bedrooms: 0,
            bathrooms: 1,
            squareFootage: 350,
            rentAmount: 35000,
            securityDeposit: 70000,
            status: UnitStatus.AVAILABLE,
            description: 'Smart studio apartment, fully furnished.',
        },
    });

    const unit10 = await prisma.unit.create({
        data: {
            propertyId: property4.id,
            unitNumber: 'S-102',
            bedrooms: 1,
            bathrooms: 1,
            squareFootage: 500,
            rentAmount: 50000,
            securityDeposit: 100000,
            status: UnitStatus.AVAILABLE,
            description: 'One-bedroom with built-in wardrobes and modern finishes.',
        },
    });

    console.log(`   ✓ Created 10 units`);

    // ==================== UNIT IMAGES ====================
    console.log('🖼️ Creating unit images...');

    await prisma.unitImage.createMany({
        data: [
            { unitId: unit1.id, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', isPrimary: true },
            { unitId: unit2.id, url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', isPrimary: true },
            { unitId: unit3.id, url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', isPrimary: true },
            { unitId: unit4.id, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', isPrimary: true },
            { unitId: unit5.id, url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', isPrimary: true },
            { unitId: unit6.id, url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', isPrimary: true },
            { unitId: unit7.id, url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', isPrimary: true },
            { unitId: unit8.id, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', isPrimary: true },
            { unitId: unit9.id, url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9', isPrimary: true },
            { unitId: unit10.id, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', isPrimary: true },
        ],
    });

    console.log(`   ✓ Created 10 unit images`);

    // ==================== LEASES ====================
    console.log('📄 Creating leases...');

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
            terms: 'Standard 1-year lease with 2-month deposit.',
            createdBy: admin.id,
        },
    });

    const lease2 = await prisma.lease.create({
        data: {
            unitId: unit2.id,
            tenantId: tenant2.id,
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-12-31'),
            rentAmount: 65000,
            securityDeposit: 130000,
            paymentFrequency: PaymentFrequency.MONTHLY,
            status: LeaseStatus.ACTIVE,
            terms: 'Standard 1-year lease.',
            createdBy: admin.id,
        },
    });

    const lease3 = await prisma.lease.create({
        data: {
            unitId: unit5.id,
            tenantId: tenant3.id,
            startDate: new Date('2025-03-01'),
            endDate: new Date('2026-02-28'),
            rentAmount: 120000,
            securityDeposit: 240000,
            paymentFrequency: PaymentFrequency.MONTHLY,
            status: LeaseStatus.ACTIVE,
            terms: 'Corporate lease agreement.',
            createdBy: admin.id,
        },
    });

    const lease4 = await prisma.lease.create({
        data: {
            unitId: unit7.id,
            tenantId: tenant4.id,
            startDate: new Date('2024-09-01'),
            endDate: new Date('2025-08-31'),
            rentAmount: 180000,
            securityDeposit: 360000,
            paymentFrequency: PaymentFrequency.MONTHLY,
            status: LeaseStatus.ACTIVE,
            terms: 'Family lease with option to renew.',
            createdBy: admin.id,
        },
    });

    console.log(`   ✓ Created 4 leases`);

    // ==================== APPLICATIONS ====================
    console.log('📝 Creating applications...');

    await prisma.application.createMany({
        data: [
            {
                unitId: unit3.id,
                tenantId: tenant1.id,
                status: ApplicationStatus.PENDING,
                applicationData: { occupation: 'Accountant', employer: 'Deloitte Kenya', income: 200000 },
            },
            {
                unitId: unit6.id,
                tenantId: tenant2.id,
                status: ApplicationStatus.PENDING,
                applicationData: { occupation: 'Software Engineer', employer: 'Safaricom', income: 250000 },
            },
            {
                unitId: unit4.id,
                tenantId: tenant3.id,
                status: ApplicationStatus.APPROVED,
                reviewedBy: landlord1.id,
                reviewedAt: new Date(),
                applicationData: { occupation: 'Doctor', employer: 'Nairobi Hospital', income: 400000 },
            },
            {
                unitId: unit9.id,
                tenantId: tenant4.id,
                status: ApplicationStatus.REJECTED,
                reviewedBy: landlord2.id,
                reviewedAt: new Date(),
                landlordNotes: 'Insufficient income documentation.',
                applicationData: { occupation: 'Student', employer: 'N/A', income: 0 },
            },
        ],
    });

    console.log(`   ✓ Created 4 applications`);

    // ==================== PAYMENTS ====================
    console.log('💰 Creating payments...');

    await prisma.payment.createMany({
        data: [
            // Tenant 1 payments
            { leaseId: lease1.id, tenantId: tenant1.id, amount: 45000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ1234567', phoneNumber: '+254733567890', paidAt: new Date('2026-01-05'), processedBy: admin.id },
            { leaseId: lease1.id, tenantId: tenant1.id, amount: 45000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ1234568', phoneNumber: '+254733567890', paidAt: new Date('2025-12-05'), processedBy: admin.id },
            { leaseId: lease1.id, tenantId: tenant1.id, amount: 45000, status: PaymentStatus.PENDING, phoneNumber: '+254733567890' },
            // Tenant 2 payments
            { leaseId: lease2.id, tenantId: tenant2.id, amount: 65000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ2345678', phoneNumber: '+254744678901', paidAt: new Date('2026-01-03'), processedBy: admin.id },
            { leaseId: lease2.id, tenantId: tenant2.id, amount: 65000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ2345679', phoneNumber: '+254744678901', paidAt: new Date('2025-12-03'), processedBy: admin.id },
            // Tenant 3 payments
            { leaseId: lease3.id, tenantId: tenant3.id, amount: 120000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ3456789', phoneNumber: '+254755789012', paidAt: new Date('2026-01-01'), processedBy: admin.id },
            { leaseId: lease3.id, tenantId: tenant3.id, amount: 120000, status: PaymentStatus.FAILED, phoneNumber: '+254755789012', notes: 'Insufficient funds' },
            // Tenant 4 payments
            { leaseId: lease4.id, tenantId: tenant4.id, amount: 180000, status: PaymentStatus.COMPLETED, mpesaReceiptNumber: 'RJQ4567890', phoneNumber: '+254766890123', paidAt: new Date('2026-01-02'), processedBy: admin.id },
        ],
    });

    console.log(`   ✓ Created 8 payments`);

    // ==================== MAINTENANCE REQUESTS ====================
    console.log('🔧 Creating maintenance requests...');

    const maintenance1 = await prisma.maintenanceRequest.create({
        data: {
            unitId: unit1.id,
            tenantId: tenant1.id,
            category: 'Plumbing',
            description: 'Bathroom sink faucet is dripping constantly, wasting water.',
            priority: Priority.MEDIUM,
            status: MaintenanceStatus.IN_PROGRESS,
            assignedTo: landlord1.id,
        },
    });

    await prisma.maintenanceRequest.create({
        data: {
            unitId: unit2.id,
            tenantId: tenant2.id,
            category: 'HVAC',
            description: 'Air conditioner makes noise but does not cool the room effectively.',
            priority: Priority.HIGH,
            status: MaintenanceStatus.OPEN,
        },
    });

    await prisma.maintenanceRequest.create({
        data: {
            unitId: unit5.id,
            tenantId: tenant3.id,
            category: 'Security',
            description: 'Front door lock is broken, security concern.',
            priority: Priority.URGENT,
            status: MaintenanceStatus.OPEN,
        },
    });

    const maintenance4 = await prisma.maintenanceRequest.create({
        data: {
            unitId: unit7.id,
            tenantId: tenant4.id,
            category: 'Electrical',
            description: 'Kitchen light bulb needs replacement.',
            priority: Priority.LOW,
            status: MaintenanceStatus.COMPLETED,
            completedAt: new Date(),
        },
    });

    console.log(`   ✓ Created 4 maintenance requests`);

    // ==================== MAINTENANCE COMMENTS ====================
    console.log('💬 Creating maintenance comments...');

    await prisma.maintenanceComment.createMany({
        data: [
            { requestId: maintenance1.id, userId: landlord1.id, comment: 'Plumber scheduled for tomorrow morning.' },
            { requestId: maintenance1.id, userId: tenant1.id, comment: 'Thank you! I will be home after 9 AM.' },
            { requestId: maintenance4.id, userId: landlord1.id, comment: 'Replaced bulb with LED. Issue resolved.' },
        ],
    });

    console.log(`   ✓ Created 3 maintenance comments`);

    // ==================== MESSAGES ====================
    console.log('✉️ Creating messages...');

    await prisma.message.createMany({
        data: [
            { senderId: tenant1.id, receiverId: landlord1.id, subject: 'Rent payment', body: 'I have made the rent payment for this month. Please confirm receipt.', isRead: true },
            { senderId: landlord1.id, receiverId: tenant1.id, subject: 'Re: Rent payment', body: 'Payment received. Thank you for your prompt payment!', isRead: true },
            { senderId: tenant2.id, receiverId: landlord1.id, subject: 'Lease renewal inquiry', body: 'My lease is ending soon. I would like to discuss renewal options.', isRead: false },
            { senderId: admin.id, receiverId: landlord1.id, subject: 'System update', body: 'New payment features are now available in the portal.', isRead: false },
            { senderId: tenant3.id, receiverId: landlord2.id, subject: 'Maintenance follow-up', body: 'When will someone come to fix the door lock?', isRead: false },
        ],
    });

    console.log(`   ✓ Created 5 messages`);

    // ==================== NOTIFICATIONS ====================
    console.log('🔔 Creating notifications...');

    await prisma.notification.createMany({
        data: [
            { userId: tenant1.id, title: 'Rent Due Reminder', message: 'Your rent payment of KES 45,000 is due in 5 days.', type: 'PAYMENT_REMINDER', isRead: false },
            { userId: tenant2.id, title: 'Application Update', message: 'Your application for Unit B-102 is being reviewed.', type: 'APPLICATION_STATUS', isRead: false },
            { userId: landlord1.id, title: 'New Application', message: 'New rental application received for Unit A-202.', type: 'NEW_APPLICATION', isRead: false },
            { userId: landlord2.id, title: 'Payment Received', message: 'Payment of KES 120,000 received from Mary Wanjiku.', type: 'PAYMENT_RECEIVED', isRead: true },
            { userId: admin.id, title: 'System Alert', message: 'All database backups completed successfully.', type: 'SYSTEM', isRead: true },
        ],
    });

    console.log(`   ✓ Created 5 notifications`);

    // ==================== SUMMARY ====================
    console.log('\n✅ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 7 Users (1 admin, 2 landlords, 4 tenants)');
    console.log('   - 4 Properties');
    console.log('   - 10 Units');
    console.log('   - 4 Leases');
    console.log('   - 4 Applications');
    console.log('   - 8 Payments');
    console.log('   - 4 Maintenance Requests');
    console.log('   - 5 Messages');
    console.log('   - 5 Notifications');

    console.log('\n🔑 Login Credentials:');
    console.log('   Admin:    admin@rental.com / admin123');
    console.log('   Landlord: john.kamau@rental.com / landlord123');
    console.log('   Landlord: grace.properties@rental.com / landlord123');
    console.log('   Tenant:   jane.mwangi@example.com / tenant123');
    console.log('   Tenant:   peter.ochieng@example.com / tenant123');
    console.log('   Tenant:   mary.wanjiku@example.com / tenant123');
    console.log('   Tenant:   samuel.njoroge@example.com / tenant123');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
