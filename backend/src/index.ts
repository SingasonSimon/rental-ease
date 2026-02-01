import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { config } from './config/env';

// Route imports
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import propertyRoutes from './routes/property.routes';
import unitRoutes from './routes/unit.routes';
import applicationRoutes from './routes/application.routes';
import leaseRoutes from './routes/lease.routes';
import maintenanceRoutes from './routes/maintenance.routes';
import messageRoutes from './routes/message.routes';
import paymentRoutes from './routes/payment.routes';
import fileRoutes from './routes/file.routes';
import notificationRoutes from './routes/notification.routes';
import googleAuthRoutes from './routes/google-auth.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Basic health check route
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/leases', leaseRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth/google', googleAuthRoutes);

app.get('/api', (_req: Request, res: Response) => {
    res.json({
        message: 'Rental & Apartment Management API',
        version: '1.0.0',
        endpoints: [
            '/api/auth',
            '/api/users',
            '/api/properties',
            '/api/units',
            '/api/applications',
            '/api/leases',
            '/api/maintenance',
            '/api/messages',
            '/api/payments',
            '/api/files',
            '/api/notifications'
        ]
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = config.port;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
