import express from 'express';
import { createApplication, getApplications, updateApplicationStatus } from '../controllers/applications.js';

const router = express.Router();

router.post('/', createApplication);
router.get('/', getApplications);
router.patch('/:id/status', updateApplicationStatus);

export default router;
