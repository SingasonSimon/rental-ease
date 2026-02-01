import sgMail from '@sendgrid/mail';
import { config } from '../config/env';

if (config.email.sendgridApiKey) {
    sgMail.setApiKey(config.email.sendgridApiKey);
}

export class EmailService {
    static async sendEmail(to: string, subject: string, text: string, html?: string) {
        if (!config.email.sendgridApiKey) {
            console.log('--- Email Simulation ---');
            console.log('To:', to);
            console.log('Subject:', subject);
            console.log('Body:', text);
            console.log('------------------------');
            return;
        }

        const msg = {
            to,
            from: config.email.from,
            subject,
            text,
            html: html || text,
        };

        try {
            await sgMail.send(msg);
        } catch (error: any) {
            console.error('SendGrid Email Error:', error.response?.body || error.message);
            // Don't throw to prevent blocking main flows, but log
        }
    }

    static async sendWelcomeEmail(email: string, name: string) {
        const subject = 'Welcome to Rental Management System';
        const text = `Hi ${name},\n\nWelcome to our platform. We are excited to have you on board.`;
        await this.sendEmail(email, subject, text);
    }

    static async sendApplicationUpdate(email: string, name: string, unitNumber: string, status: string) {
        const subject = `Application Update - Unit ${unitNumber}`;
        const text = `Hi ${name},\n\nYour application for Unit ${unitNumber} has been ${status.toLowerCase()}.`;
        await this.sendEmail(email, subject, text);
    }

    static async sendPaymentConfirmation(email: string, name: string, amount: number, receipt: string) {
        const subject = 'Rent Payment Confirmation';
        const text = `Hi ${name},\n\nWe have received your payment of KES ${amount}. Receipt Number: ${receipt}.`;
        await this.sendEmail(email, subject, text);
    }
}
