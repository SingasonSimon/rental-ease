import axios from 'axios';
import { config } from '../config/env';

export class MpesaService {
    private static async getAccessToken() {
        const { consumerKey, consumerSecret } = config.mpesa;
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

        try {
            const response = await axios.get(
                'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
                {
                    headers: {
                        Authorization: `Basic ${auth}`
                    }
                }
            );
            return response.data.access_token;
        } catch (error: any) {
            console.error('M-Pesa OAuth Error:', error.response?.data || error.message);
            throw new Error('Failed to get M-Pesa access token');
        }
    }

    static async initiateStkPush(amount: number, phoneNumber: string, orderId: string) {
        const token = await this.getAccessToken();
        const { businessShortCode, passkey, callbackUrl } = config.mpesa;

        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
        const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');

        // Format phone number (should be 2547XXXXXXXX)
        const formattedPhone = phoneNumber.startsWith('0')
            ? `254${phoneNumber.slice(1)}`
            : phoneNumber.startsWith('+')
                ? phoneNumber.slice(1)
                : phoneNumber;

        const payload = {
            BusinessShortCode: businessShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: businessShortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: callbackUrl,
            AccountReference: orderId,
            TransactionDesc: `Payment for Order ${orderId}`
        };

        try {
            const response = await axios.post(
                'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('M-Pesa STK Push Error:', error.response?.data || error.message);
            throw new Error('Failed to initiate M-Pesa payment');
        }
    }
}
