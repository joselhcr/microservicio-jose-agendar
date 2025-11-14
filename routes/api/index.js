import express from 'express';
import solicitudesRoutes from './solicitudes.js';

const router = express.Router();
router.use('/solicitudes', solicitudesRoutes);


export default router;