# Rental & Apartment Management System

A full-stack web application for managing rental properties, apartments, tenants, and payments with M-Pesa integration.

## Project Structure

```
rental-management/
├── README.md                    # This file
├── backend/                     # Node.js + Express + PostgreSQL
└── frontend/                    # Next.js + TypeScript + Tailwind
```

## Project Overview

This system enables:
- **Admins**: Full system control including M-Pesa payment processing
- **Landlords**: Property and unit management (read-only payment access)
- **Tenants**: Browse apartments, apply for rentals, track payments

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- M-Pesa Daraja API

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your database URL
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@rental.com | admin123 |
| Landlord | john.kamau@rental.com | landlord123 |
| Tenant | jane.mwangi@example.com | tenant123 |
