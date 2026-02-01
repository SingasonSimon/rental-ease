import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';

interface TokenPayload {
    userId: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: config.jwt.expiresIn as any,
    };
    return jwt.sign(payload, config.jwt.secret as Secret, options);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: config.jwt.refreshExpiresIn as any,
    };
    return jwt.sign(payload, config.jwt.refreshSecret as Secret, options);
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, config.jwt.secret as Secret) as TokenPayload;
    } catch {
        return null;
    }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, config.jwt.refreshSecret as Secret) as TokenPayload;
    } catch {
        return null;
    }
};
