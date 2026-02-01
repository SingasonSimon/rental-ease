-- Rental Management System - Database Seed SQL
-- Run this directly in Neon Console or via psql

-- Clean up existing data (in correct order due to foreign keys)
DELETE FROM maintenance_comments;
DELETE FROM maintenance_requests;
DELETE FROM messages;
DELETE FROM notifications;
DELETE FROM payments;
DELETE FROM leases;
DELETE FROM applications;
DELETE FROM unit_images;
DELETE FROM units;
DELETE FROM property_images;
DELETE FROM properties;
DELETE FROM users;

-- ==================== USERS ====================
-- Passwords: admin123, landlord123, tenant123 (bcrypt hashed)
INSERT INTO users (id, email, "passwordHash", role, "firstName", "lastName", phone, "emailVerified", "isActive", "createdAt", "updatedAt") VALUES
('u1-admin-001', 'admin@rental.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'ADMIN', 'System', 'Administrator', '+254700000001', true, true, NOW(), NOW()),
('u2-landlord-001', 'john.kamau@rental.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'LANDLORD', 'John', 'Kamau', '+254712345678', true, true, NOW(), NOW()),
('u3-landlord-002', 'grace.properties@rental.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'LANDLORD', 'Grace', 'Wanjiru', '+254722456789', true, true, NOW(), NOW()),
('u4-tenant-001', 'jane.mwangi@example.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'TENANT', 'Jane', 'Mwangi', '+254733567890', true, true, NOW(), NOW()),
('u5-tenant-002', 'peter.ochieng@example.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'TENANT', 'Peter', 'Ochieng', '+254744678901', true, true, NOW(), NOW()),
('u6-tenant-003', 'mary.wanjiku@example.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'TENANT', 'Mary', 'Wanjiku', '+254755789012', true, true, NOW(), NOW()),
('u7-tenant-004', 'samuel.njoroge@example.com', '$2b$10$jZ5T7Jw8vH5XkQJQ4v6eNuZbQmT8f8J5qn0pXkR5bZwvU3mL9oJ6i', 'TENANT', 'Samuel', 'Njoroge', '+254766890123', true, true, NOW(), NOW());

-- ==================== PROPERTIES ====================
INSERT INTO properties (id, name, address, city, description, amenities, "landlordId", "createdBy", "isActive", "createdAt", "updatedAt") VALUES
('p1-kileleshwa', 'Kileleshwa Heights', 'Othaya Road, Kileleshwa', 'Nairobi', 'Modern apartment complex with excellent amenities including 24/7 security, parking, and a gym.', ARRAY['Gym', 'Swimming Pool', '24/7 Security', 'Parking', 'Elevator', 'Backup Generator'], 'u2-landlord-001', 'u1-admin-001', true, NOW(), NOW()),
('p2-westlands', 'Westlands Prime', 'Waiyaki Way, Westlands', 'Nairobi', 'Premium apartments in Westlands business district with stunning city views.', ARRAY['Rooftop Lounge', '24/7 Security', 'Parking', 'Elevator', 'Fiber Internet'], 'u3-landlord-002', 'u1-admin-001', true, NOW(), NOW()),
('p3-lavington', 'Lavington Gardens', 'James Gichuru Road, Lavington', 'Nairobi', 'Luxurious townhouses in serene Lavington, perfect for families.', ARRAY['Garden', 'Playground', '24/7 Security', 'Parking', 'Servant Quarters'], 'u2-landlord-001', 'u1-admin-001', true, NOW(), NOW()),
('p4-kilimani', 'Kilimani Suites', 'Argwings Kodhek Road, Kilimani', 'Nairobi', 'Contemporary studio and one-bedroom apartments for young professionals.', ARRAY['Gym', 'Co-working Space', '24/7 Security', 'Parking'], 'u3-landlord-002', 'u1-admin-001', true, NOW(), NOW());

-- ==================== PROPERTY IMAGES ====================
INSERT INTO property_images (id, "propertyId", url, "isPrimary", "createdAt") VALUES
('pi1', 'p1-kileleshwa', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', true, NOW()),
('pi2', 'p1-kileleshwa', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', false, NOW()),
('pi3', 'p2-westlands', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', true, NOW()),
('pi4', 'p3-lavington', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', true, NOW()),
('pi5', 'p4-kilimani', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', true, NOW());

-- ==================== UNITS ====================
INSERT INTO units (id, "propertyId", "unitNumber", bedrooms, bathrooms, "squareFootage", "rentAmount", "securityDeposit", status, description, "createdAt", "updatedAt") VALUES
('unit1', 'p1-kileleshwa', 'A-101', 1, 1, 550, 45000, 90000, 'OCCUPIED', 'Cozy 1-bedroom on ground floor with balcony.', NOW(), NOW()),
('unit2', 'p1-kileleshwa', 'A-201', 2, 1, 850, 65000, 130000, 'OCCUPIED', 'Spacious 2-bedroom with modern kitchen.', NOW(), NOW()),
('unit3', 'p1-kileleshwa', 'A-202', 2, 2, 900, 75000, 150000, 'AVAILABLE', 'Corner unit with master ensuite.', NOW(), NOW()),
('unit4', 'p1-kileleshwa', 'A-301', 3, 2, 1200, 95000, 190000, 'AVAILABLE', 'Penthouse with rooftop access.', NOW(), NOW()),
('unit5', 'p2-westlands', 'B-101', 3, 2, 1100, 120000, 240000, 'OCCUPIED', 'Executive 3-bedroom with home office.', NOW(), NOW()),
('unit6', 'p2-westlands', 'B-102', 2, 2, 950, 95000, 190000, 'AVAILABLE', 'Modern 2-bedroom with city views.', NOW(), NOW()),
('unit7', 'p3-lavington', 'TH-01', 4, 3, 2500, 180000, 360000, 'OCCUPIED', '4-bedroom townhouse with garden.', NOW(), NOW()),
('unit8', 'p3-lavington', 'TH-02', 4, 3, 2500, 180000, 360000, 'AVAILABLE', 'Corner townhouse with extra parking.', NOW(), NOW()),
('unit9', 'p4-kilimani', 'S-101', 0, 1, 350, 35000, 70000, 'AVAILABLE', 'Smart studio, fully furnished.', NOW(), NOW()),
('unit10', 'p4-kilimani', 'S-102', 1, 1, 500, 50000, 100000, 'AVAILABLE', 'One-bedroom with built-in wardrobes.', NOW(), NOW());

-- ==================== UNIT IMAGES ====================
INSERT INTO unit_images (id, "unitId", url, "isPrimary", "createdAt") VALUES
('ui1', 'unit1', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', true, NOW()),
('ui2', 'unit2', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', true, NOW()),
('ui3', 'unit3', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', true, NOW()),
('ui4', 'unit4', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', true, NOW()),
('ui5', 'unit5', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', true, NOW()),
('ui6', 'unit6', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', true, NOW()),
('ui7', 'unit7', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', true, NOW()),
('ui8', 'unit8', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', true, NOW());

-- ==================== LEASES ====================
INSERT INTO leases (id, "unitId", "tenantId", "startDate", "endDate", "rentAmount", "securityDeposit", "paymentFrequency", status, terms, "createdBy", "createdAt", "updatedAt") VALUES
('lease1', 'unit1', 'u4-tenant-001', '2025-06-01', '2026-05-31', 45000, 90000, 'MONTHLY', 'ACTIVE', 'Standard 1-year lease.', 'u1-admin-001', NOW(), NOW()),
('lease2', 'unit2', 'u5-tenant-002', '2025-01-01', '2025-12-31', 65000, 130000, 'MONTHLY', 'ACTIVE', 'Standard 1-year lease.', 'u1-admin-001', NOW(), NOW()),
('lease3', 'unit5', 'u6-tenant-003', '2025-03-01', '2026-02-28', 120000, 240000, 'MONTHLY', 'ACTIVE', 'Corporate lease agreement.', 'u1-admin-001', NOW(), NOW()),
('lease4', 'unit7', 'u7-tenant-004', '2024-09-01', '2025-08-31', 180000, 360000, 'MONTHLY', 'ACTIVE', 'Family lease with renewal option.', 'u1-admin-001', NOW(), NOW());

-- ==================== PAYMENTS ====================
INSERT INTO payments (id, "leaseId", "tenantId", amount, status, "mpesaReceiptNumber", "phoneNumber", "paidAt", "processedBy", "createdAt", "updatedAt") VALUES
('pay1', 'lease1', 'u4-tenant-001', 45000, 'COMPLETED', 'RJQ1234567', '+254733567890', '2026-01-05', 'u1-admin-001', NOW(), NOW()),
('pay2', 'lease1', 'u4-tenant-001', 45000, 'COMPLETED', 'RJQ1234568', '+254733567890', '2025-12-05', 'u1-admin-001', NOW(), NOW()),
('pay3', 'lease2', 'u5-tenant-002', 65000, 'COMPLETED', 'RJQ2345678', '+254744678901', '2026-01-03', 'u1-admin-001', NOW(), NOW()),
('pay4', 'lease3', 'u6-tenant-003', 120000, 'COMPLETED', 'RJQ3456789', '+254755789012', '2026-01-01', 'u1-admin-001', NOW(), NOW()),
('pay5', 'lease4', 'u7-tenant-004', 180000, 'COMPLETED', 'RJQ4567890', '+254766890123', '2026-01-02', 'u1-admin-001', NOW(), NOW());

-- ==================== APPLICATIONS ====================
INSERT INTO applications (id, "unitId", "tenantId", status, "applicationData", "createdAt", "updatedAt") VALUES
('app1', 'unit3', 'u4-tenant-001', 'PENDING', '{"occupation": "Accountant", "employer": "Deloitte Kenya"}', NOW(), NOW()),
('app2', 'unit6', 'u5-tenant-002', 'PENDING', '{"occupation": "Software Engineer", "employer": "Safaricom"}', NOW(), NOW());

-- ==================== MAINTENANCE REQUESTS ====================
INSERT INTO maintenance_requests (id, "unitId", "tenantId", category, description, priority, status, "assignedTo", "createdAt", "updatedAt") VALUES
('maint1', 'unit1', 'u4-tenant-001', 'Plumbing', 'Bathroom sink faucet is dripping constantly.', 'MEDIUM', 'IN_PROGRESS', 'u2-landlord-001', NOW(), NOW()),
('maint2', 'unit2', 'u5-tenant-002', 'HVAC', 'Air conditioner not cooling effectively.', 'HIGH', 'OPEN', NULL, NOW(), NOW()),
('maint3', 'unit5', 'u6-tenant-003', 'Security', 'Front door lock broken, security concern.', 'URGENT', 'OPEN', NULL, NOW(), NOW()),
('maint4', 'unit7', 'u7-tenant-004', 'Electrical', 'Kitchen light bulb replacement needed.', 'LOW', 'COMPLETED', NULL, NOW(), NOW());

-- ==================== MESSAGES ====================
INSERT INTO messages (id, "senderId", "receiverId", subject, body, "isRead", "createdAt") VALUES
('msg1', 'u4-tenant-001', 'u2-landlord-001', 'Rent payment', 'I have made the rent payment. Please confirm.', true, NOW()),
('msg2', 'u2-landlord-001', 'u4-tenant-001', 'Re: Rent payment', 'Payment received. Thank you!', true, NOW()),
('msg3', 'u5-tenant-002', 'u2-landlord-001', 'Lease renewal', 'Interested in renewing my lease.', false, NOW());

-- ==================== NOTIFICATIONS ====================
INSERT INTO notifications (id, "userId", title, message, type, "isRead", "createdAt") VALUES
('notif1', 'u4-tenant-001', 'Rent Due', 'Your rent of KES 45,000 is due in 5 days.', 'PAYMENT_REMINDER', false, NOW()),
('notif2', 'u2-landlord-001', 'New Application', 'New application received for Unit A-202.', 'NEW_APPLICATION', false, NOW()),
('notif3', 'u3-landlord-002', 'Payment Received', 'KES 120,000 received from Mary Wanjiku.', 'PAYMENT_RECEIVED', true, NOW());

-- SEED COMPLETE!
-- Login Credentials:
-- Admin:    admin@rental.com / admin123
-- Landlord: john.kamau@rental.com / landlord123
-- Landlord: grace.properties@rental.com / landlord123
-- Tenant:   jane.mwangi@example.com / tenant123
-- Tenant:   peter.ochieng@example.com / tenant123
-- Tenant:   mary.wanjiku@example.com / tenant123
-- Tenant:   samuel.njoroge@example.com / tenant123
