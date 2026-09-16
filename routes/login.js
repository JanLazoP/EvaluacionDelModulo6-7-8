import express from 'express';
import { login } from '../controllers/autenticacion.js';

const router = express.Router();

router.post('/', login);

export default router;