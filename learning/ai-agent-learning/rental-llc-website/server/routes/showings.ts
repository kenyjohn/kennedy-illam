import express from 'express';
import {
    createShowing,
    getShowings,
    getShowingById,
    updateShowingStatus,
    deleteShowing,
    getAvailableSlots,
} from '../controllers/showings.js';

const router = express.Router();

// IMPORTANT: Specific routes must come BEFORE parameterized routes
// Get available slots for a property (must be before /:id route)
router.get('/property/:propertyId/available-slots', getAvailableSlots);

router.post('/', createShowing);
router.get('/', getShowings);
router.get('/:id', getShowingById);
router.patch('/:id/status', updateShowingStatus);
router.delete('/:id', deleteShowing);

export default router;
