import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createApplication = async (req: Request, res: Response) => {
    try {
        const {
            propertyId,
            // Personal Information
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            // Move-in Details
            desiredMoveInDate,
            leaseTerm,
            numberOfOccupants,
            hasPets,
            petDetails,
            // Employment
            employmentStatus,
            employer,
            jobTitle,
            monthlyIncome,
            // Rental History
            currentAddress,
            landlordName,
            landlordPhone,
            reasonForLeaving,
            // References
            reference1Name,
            reference1Phone,
            reference1Relationship,
            reference2Name,
            reference2Phone,
            reference2Relationship,
            // Additional
            additionalInfo,
        } = req.body;

        const application = await prisma.application.create({
            data: {
                propertyId,
                firstName,
                lastName,
                email,
                phone,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                desiredMoveInDate: desiredMoveInDate ? new Date(desiredMoveInDate) : null,
                leaseTerm: leaseTerm || null,
                numberOfOccupants: numberOfOccupants ? parseInt(numberOfOccupants) : null,
                hasPets: hasPets === true || hasPets === 'true',
                petDetails: petDetails || null,
                employmentStatus: employmentStatus || null,
                employer: employer || null,
                jobTitle: jobTitle || null,
                monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
                currentAddress: currentAddress || null,
                landlordName: landlordName || null,
                landlordPhone: landlordPhone || null,
                reasonForLeaving: reasonForLeaving || null,
                reference1Name: reference1Name || null,
                reference1Phone: reference1Phone || null,
                reference1Relationship: reference1Relationship || null,
                reference2Name: reference2Name || null,
                reference2Phone: reference2Phone || null,
                reference2Relationship: reference2Relationship || null,
                additionalInfo: additionalInfo || null,
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

        res.status(201).json(application);
    } catch (error) {
        console.error('Create application error:', error);
        res.status(500).json({ message: 'Error creating application' });
    }
};

export const getApplications = async (req: Request, res: Response) => {
    try {
        const applications = await prisma.application.findMany({
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
        res.json(applications);
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const application = await prisma.application.update({
            where: { id },
            data: { status },
        });
        res.json(application);
    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).json({ message: 'Error updating application' });
    }
};
