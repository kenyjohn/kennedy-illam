import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });

// Upload a document
export const uploadDocument = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, type, tenantId, propertyId } = req.body;

        if (!title || !type) {
            return res.status(400).json({ message: 'Title and type are required' });
        }

        const document = await prisma.document.create({
            data: {
                title,
                type,
                url: `/uploads/${req.file.filename}`, // Relative URL for serving
                tenantId: tenantId || null,
                propertyId: propertyId || null
            }
        });

        res.status(201).json(document);
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get documents (Admin: all or filtered; Tenant: only theirs)
export const getDocuments = async (req: Request, res: Response) => {
    try {
        const { tenantId, propertyId } = req.query;

        // In a real app, we'd check req.user to ensure tenants only see their own docs
        // For now, we rely on the frontend passing the correct tenantId for tenants

        const where: any = {};
        if (tenantId) where.tenantId = String(tenantId);
        if (propertyId) where.propertyId = String(propertyId);

        const documents = await prisma.document.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                tenant: { select: { firstName: true, lastName: true } },
                property: { select: { title: true } }
            }
        });

        res.json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete document
export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const document = await prisma.document.findUnique({ where: { id: String(id) } });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Delete file from filesystem
        const filePath = path.join(process.cwd(), document.url); // url is /uploads/filename
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await prisma.document.delete({ where: { id: String(id) } });

        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
