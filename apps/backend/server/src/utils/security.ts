import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateAccessToken(payload: { userId: string; email: string; role?: string }): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '15m',
  });
}

export function generateRefreshToken(payload: { userId: string; sessionId: string }): string {
  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: '30d',
  });
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, config.jwtSecret);
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, config.jwtRefreshSecret);
}
