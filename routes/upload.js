import express from 'express';
import upload from '../middlewares/upload.js';
import { subirArchivo } from '../controllers/upload.js';

const router = express.Router();

router.post('/', upload.single('archivo'), subirArchivo);

export default router;
