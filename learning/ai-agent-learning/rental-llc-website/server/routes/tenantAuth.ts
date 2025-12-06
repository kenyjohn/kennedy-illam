import express from 'express';
import { register, login, verifyToken, getAllTenants } from '../controllers/tenantAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken);
router.get('/', getAllTenants);

export default router;
