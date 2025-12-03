import express from 'express';
import {
    getPropertyAvailability,
    createAvailability,
    updateAvailability,
    deleteAvailability,
} from '../controllers/availability.js';

const router = express.Router();

// Property availability routes
router.get('/:propertyId', getPropertyAvailability);
router.post('/:propertyId', createAvailability);
router.put('/:availId', updateAvailability);
router.delete('/:availId', deleteAvailability);

export default router;
