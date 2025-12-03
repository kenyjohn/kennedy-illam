import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createInquiry = async (req: Request, res: Response) => {
    try {
        const {
            propertyId,
            name,
            email,
            phone,
            message,
            inquiryType,
            preferredDate,
            preferredTime,
        } = req.body;

        const inquiry = await prisma.inquiry.create({
            data: {
                propertyId,
                name,
                email,
                phone: phone || null,
                message,
                inquiryType,
                preferredDate: preferredDate ? new Date(preferredDate) : null,
                preferredTime: preferredTime || null,
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

        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Create inquiry error:', error);
        res.status(500).json({ message: 'Error creating inquiry' });
    }
};

export const getInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await prisma.inquiry.findMany({
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
            orderBy: { createdAt: 'desc' },
        });
        res.json(inquiries);
    } catch (error) {
        console.error('Get inquiries error:', error);
        res.status(500).json({ message: 'Error fetching inquiries' });
    }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: { status },
        });
        res.json(inquiry);
    } catch (error) {
        console.error('Update inquiry error:', error);
        res.status(500).json({ message: 'Error updating inquiry' });
    }
};
