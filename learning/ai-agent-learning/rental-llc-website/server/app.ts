import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import propertyRoutes from './routes/properties.js';
import authRoutes from './routes/auth.js';
import inquiryRoutes from './routes/inquiries.js';
import applicationRoutes from './routes/applications.js';
import showingRoutes from './routes/showings.js';
import availabilityRoutes from './routes/availability.js';
import tenantAuthRoutes from './routes/tenantAuth.js';
import maintenanceRoutes from './routes/maintenance.js';
import documentRoutes from './routes/documents.js';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth/tenant', tenantAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/showings', showingRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/documents', documentRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;
