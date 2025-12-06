import express from 'express';
import { upload, uploadDocument, getDocuments, deleteDocument } from '../controllers/documents.js';

const router = express.Router();

router.post('/', upload.single('file'), uploadDocument);
router.get('/', getDocuments);
router.delete('/:id', deleteDocument);

export default router;
