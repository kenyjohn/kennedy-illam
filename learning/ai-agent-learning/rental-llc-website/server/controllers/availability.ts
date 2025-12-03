import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get availability for a property
export const getPropertyAvailability = async (req: Request, res: Response) => {
    const { propertyId } = req.params;

    try {
        const availability = await prisma.showingAvailability.findMany({
            where: { propertyId },
            orderBy: { dayOfWeek: 'asc' },
        });

        res.json(availability);
    } catch (error) {
        console.error('Get availability error:', error);
        res.status(500).json({ message: 'Error fetching availability' });
    }
};

// Create availability for a property
export const createAvailability = async (req: Request, res: Response) => {
    const { propertyId } = req.params;
    const { dayOfWeek, startTime, endTime, slotDuration } = req.body;

    try {
        const availability = await prisma.showingAvailability.create({
            data: {
                propertyId,
                dayOfWeek: parseInt(dayOfWeek),
                startTime,
                endTime,
                slotDuration: slotDuration || 30,
            },
        });

        res.status(201).json(availability);
    } catch (error) {
        console.error('Create availability error:', error);
        res.status(500).json({ message: 'Error creating availability' });
    }
};

// Update availability
export const updateAvailability = async (req: Request, res: Response) => {
    const { availId } = req.params;
    const { dayOfWeek, startTime, endTime, slotDuration, isActive } = req.body;

    try {
        const availability = await prisma.showingAvailability.update({
            where: { id: availId },
            data: {
                dayOfWeek: dayOfWeek !== undefined ? parseInt(dayOfWeek) : undefined,
                startTime,
                endTime,
                slotDuration,
                isActive,
            },
        });

        res.json(availability);
    } catch (error) {
        console.error('Update availability error:', error);
        res.status(500).json({ message: 'Error updating availability' });
    }
};

// Delete availability
export const deleteAvailability = async (req: Request, res: Response) => {
    const { availId } = req.params;

    try {
        await prisma.showingAvailability.delete({
            where: { id: availId },
        });

        res.json({ message: 'Availability deleted successfully' });
    } catch (error) {
        console.error('Delete availability error:', error);
        res.status(500).json({ message: 'Error deleting availability' });
    }
};
