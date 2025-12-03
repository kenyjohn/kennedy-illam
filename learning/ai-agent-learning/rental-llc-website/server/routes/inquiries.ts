import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiries.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries);
router.patch('/:id/status', updateInquiryStatus);

export default router;
