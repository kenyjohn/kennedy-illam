import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProperties = async (req: Request, res: Response) => {
    try {
        const properties = await prisma.property.findMany({
            include: { images: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

export const getPropertyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const property = await prisma.property.findUnique({
            where: { id },
            include: { images: true },
        });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property' });
    }
};

export const createProperty = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            address,
            city,
            state,
            zip,
            price,
            bedrooms,
            bathrooms,
            sqft,
            available,
            petsAllowed,
            features,
            imageUrls,
        } = req.body;

        const property = await prisma.property.create({
            data: {
                title,
                description,
                address,
                city,
                state,
                zip,
                price: parseInt(price),
                bedrooms: parseInt(bedrooms),
                bathrooms: parseFloat(bathrooms),
                sqft: sqft ? parseInt(sqft) : null,
                available: available !== false,
                petsAllowed: petsAllowed === true,
                features: features || '',
                images: {
                    create: (imageUrls || []).map((url: string) => ({ url })),
                },
            },
            include: { images: true },
        });

        res.status(201).json(property);
    } catch (error) {
        console.error('Create property error:', error);
        res.status(500).json({ message: 'Error creating property' });
    }
};

export const updateProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const {
            title,
            description,
            address,
            city,
            state,
            zip,
            price,
            bedrooms,
            bathrooms,
            sqft,
            available,
            petsAllowed,
            features,
        } = req.body;

        const property = await prisma.property.update({
            where: { id },
            data: {
                title,
                description,
                address,
                city,
                state,
                zip,
                price: price ? parseInt(price) : undefined,
                bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
                bathrooms: bathrooms ? parseFloat(bathrooms) : undefined,
                sqft: sqft ? parseInt(sqft) : undefined,
                available,
                petsAllowed,
                features,
            },
            include: { images: true },
        });

        res.json(property);
    } catch (error) {
        console.error('Update property error:', error);
        res.status(500).json({ message: 'Error updating property' });
    }
};

export const deleteProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.property.delete({
            where: { id },
        });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Delete property error:', error);
        res.status(500).json({ message: 'Error deleting property' });
    }
};
