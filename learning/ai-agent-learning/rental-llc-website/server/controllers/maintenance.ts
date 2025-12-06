import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all maintenance requests (Admin) or for a specific tenant
export const getMaintenanceRequests = async (req: Request, res: Response) => {
    try {
        const { tenantId, propertyId, status } = req.query;

        const where: any = {};
        if (tenantId) where.tenantId = String(tenantId);
        if (propertyId) where.propertyId = String(propertyId);
        if (status) where.status = String(status);

        const requests = await prisma.maintenanceRequest.findMany({
            where,
            include: {
                tenant: {
                    select: { firstName: true, lastName: true, email: true, phone: true, unitNumber: true }
                },
                property: {
                    select: { title: true, address: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(requests);
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new maintenance request (Tenant)
export const createMaintenanceRequest = async (req: Request, res: Response) => {
    try {
        const { tenantId, propertyId, category, priority, description, preferredAccessTimes, photos } = req.body;

        if (!tenantId || !propertyId || !category || !priority || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const request = await prisma.maintenanceRequest.create({
            data: {
                tenantId,
                propertyId,
                category,
                priority,
                description,
                preferredAccessTimes,
                photos: photos ? JSON.stringify(photos) : null,
                status: 'NEW'
            }
        });

        res.status(201).json(request);
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update maintenance request status (Admin)
export const updateMaintenanceRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, adminNotes } = req.body;

        const request = await prisma.maintenanceRequest.update({
            where: { id: String(id) },
            data: {
                status,
                adminNotes
            }
        });

        res.json(request);
    } catch (error) {
        console.error('Error updating maintenance request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
