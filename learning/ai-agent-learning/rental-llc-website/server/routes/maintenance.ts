import express from 'express';
import {
    getMaintenanceRequests,
    createMaintenanceRequest,
    updateMaintenanceRequest
} from '../controllers/maintenance.js';

const router = express.Router();

router.get('/', getMaintenanceRequests);
router.post('/', createMaintenanceRequest);
router.patch('/:id', updateMaintenanceRequest);

export default router;
