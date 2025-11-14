import express from 'express';
import { obtenerSolicitudes, crearSolicitud } from '../../controllers/solicitudController.js';

const router = express.Router();

// /api/solicitudes
router.get('/', obtenerSolicitudes);

// /api/solicitudes
router.post('/', crearSolicitud);

export default router;