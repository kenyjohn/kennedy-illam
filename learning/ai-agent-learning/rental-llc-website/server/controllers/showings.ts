import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new showing request
export const createShowing = async (req: Request, res: Response) => {
    try {
        const {
            propertyId,
            name,
            email,
            phone,
            scheduledDate,
            scheduledTime,
            duration,
            notes,
        } = req.body;

        const showing = await prisma.showing.create({
            data: {
                propertyId,
                name,
                email,
                phone,
                scheduledDate: new Date(scheduledDate),
                scheduledTime,
                duration: duration || 30,
                notes: notes || null,
            },
            include: {
                property: {
                    select: {
                        title: true,
                        address: true,
                        city: true,
                        state: true,
                    },
                },
            },
        });

        res.status(201).json(showing);
    } catch (error) {
        console.error('Create showing error:', error);
        res.status(500).json({ message: 'Error creating showing' });
    }
};

// Get all showings (admin)
export const getShowings = async (req: Request, res: Response) => {
    try {
        const { status, propertyId } = req.query;

        const where: any = {};
        if (status) where.status = status;
        if (propertyId) where.propertyId = propertyId;

        const showings = await prisma.showing.findMany({
            where,
            include: {
                property: {
                    select: {
                        title: true,
                        address: true,
                        city: true,
                        state: true,
                    },
                },
            },
            orderBy: { scheduledDate: 'asc' },
        });

        res.json(showings);
    } catch (error) {
        console.error('Get showings error:', error);
        res.status(500).json({ message: 'Error fetching showings' });
    }
};

// Get showing by ID
export const getShowingById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const showing = await prisma.showing.findUnique({
            where: { id },
            include: {
                property: {
                    select: {
                        title: true,
                        address: true,
                        city: true,
                        state: true,
                    },
                },
            },
        });

        if (!showing) {
            return res.status(404).json({ message: 'Showing not found' });
        }

        res.json(showing);
    } catch (error) {
        console.error('Get showing error:', error);
        res.status(500).json({ message: 'Error fetching showing' });
    }
};

// Update showing status (admin)
export const updateShowingStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    try {
        const showing = await prisma.showing.update({
            where: { id },
            data: {
                status,
                notes: notes || undefined,
            },
        });

        res.json(showing);
    } catch (error) {
        console.error('Update showing error:', error);
        res.status(500).json({ message: 'Error updating showing' });
    }
};

// Delete/Cancel showing
export const deleteShowing = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.showing.delete({
            where: { id },
        });

        res.json({ message: 'Showing cancelled successfully' });
    } catch (error) {
        console.error('Delete showing error:', error);
        res.status(500).json({ message: 'Error cancelling showing' });
    }
};

// Get available time slots for a property on a specific date
export const getAvailableSlots = async (req: Request, res: Response) => {
    const { propertyId } = req.params;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date parameter is required' });
    }

    try {
        // Parse date string components to create a local date object
        // This avoids timezone issues where new Date('YYYY-MM-DD') parses as UTC
        // and getDay() returns the previous day in western timezones
        const [year, month, day] = (date as string).split('-').map(Number);
        const requestedDate = new Date(year, month - 1, day);
        const dayOfWeek = requestedDate.getDay();

        // Get availability settings for this day
        const availability = await prisma.showingAvailability.findMany({
            where: {
                propertyId,
                dayOfWeek,
                isActive: true,
            },
        });

        if (availability.length === 0) {
            return res.json([]);
        }

        // Get existing showings for this date
        const startOfDay = new Date(requestedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(requestedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const existingShowings = await prisma.showing.findMany({
            where: {
                propertyId,
                scheduledDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: {
                    in: ['PENDING', 'CONFIRMED'],
                },
            },
        });

        // Generate available slots
        const slots: any[] = [];

        availability.forEach((avail) => {
            const [startHour, startMinute] = avail.startTime.split(':').map(Number);
            const [endHour, endMinute] = avail.endTime.split(':').map(Number);

            let currentTime = startHour * 60 + startMinute;
            const endTime = endHour * 60 + endMinute;

            while (currentTime + avail.slotDuration <= endTime) {
                const hour = Math.floor(currentTime / 60);
                const minute = currentTime % 60;
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

                // Convert to 12-hour format for display
                const displayHour = hour % 12 || 12;
                const ampm = hour < 12 ? 'AM' : 'PM';
                const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;

                // Check if slot is already booked
                const isBooked = existingShowings.some(
                    showing => showing.scheduledTime === displayTime
                );

                if (!isBooked) {
                    slots.push({
                        time: displayTime,
                        value: timeString,
                        duration: avail.slotDuration,
                    });
                }

                currentTime += avail.slotDuration;
            }
        });

        res.json(slots);
    } catch (error) {
        console.error('Get available slots error:', error);
        res.status(500).json({ message: 'Error fetching available slots' });
    }
};
