import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeychangeinproduction';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, phone, propertyId, unitNumber, leaseStart, leaseEnd } = req.body;

        if (!email || !password || !firstName || !lastName || !propertyId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingTenant = await prisma.tenant.findUnique({
            where: { email },
        });

        if (existingTenant) {
            return res.status(400).json({ message: 'Tenant already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const tenant = await prisma.tenant.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                propertyId,
                unitNumber,
                leaseStart: leaseStart ? new Date(leaseStart) : null,
                leaseEnd: leaseEnd ? new Date(leaseEnd) : null,
            },
        });

        const token = jwt.sign(
            { tenantId: tenant.id, email: tenant.email, role: 'tenant' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            tenant: {
                id: tenant.id,
                email: tenant.email,
                firstName: tenant.firstName,
                lastName: tenant.lastName,
                propertyId: tenant.propertyId,
                leaseStart: tenant.leaseStart,
                leaseEnd: tenant.leaseEnd,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const tenant = await prisma.tenant.findUnique({
            where: { email },
        });

        if (!tenant) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, tenant.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { tenantId: tenant.id, email: tenant.email, role: 'tenant' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            tenant: {
                id: tenant.id,
                email: tenant.email,
                firstName: tenant.firstName,
                lastName: tenant.lastName,
                propertyId: tenant.propertyId,
                leaseStart: tenant.leaseStart,
                leaseEnd: tenant.leaseEnd,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { tenantId: string; email: string; role: string };

        if (decoded.role !== 'tenant') {
            return res.status(401).json({ message: 'Invalid token role' });
        }

        const tenant = await prisma.tenant.findUnique({
            where: { id: decoded.tenantId },
            select: { id: true, email: true, firstName: true, lastName: true, propertyId: true },
        });

        if (!tenant) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.json({ valid: true, tenant });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
};

export const getAllTenants = async (req: Request, res: Response) => {
    try {
        const tenants = await prisma.tenant.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                unitNumber: true,
                property: {
                    select: { title: true }
                }
            }
        });
        res.json(tenants);
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
