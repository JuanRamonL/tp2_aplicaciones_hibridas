import express from 'express';
import { entradas, nuevaEntrada } from '../controllers/EntradasControllers.js';
const router = express.Router();

router.get('/entradas', entradas);

router.post('/nueva-entrada', nuevaEntrada);



export default router;

