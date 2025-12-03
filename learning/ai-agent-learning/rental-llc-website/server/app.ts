import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import propertyRoutes from './routes/properties.js';
import authRoutes from './routes/auth.js';
import inquiryRoutes from './routes/inquiries.js';
import applicationRoutes from './routes/applications.js';
import showingRoutes from './routes/showings.js';
import availabilityRoutes from './routes/availability.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/showings', showingRoutes);
app.use('/api/availability', availabilityRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;
