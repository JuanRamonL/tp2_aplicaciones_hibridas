import express from 'express';
import { login, register } from '../controllers/autenticacionController.js';
import { body } from "express-validator";
import { validacionesUsuarios } from '../middlewares/validacionesUsuarios.js';

const router = express.Router();


router.post('/register',
    [ 
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
        body('email').notEmpty().withMessage('El email es obligatorio'),
        body('email').trim().isEmail().withMessage('El email no es válido'),
        body('password').notEmpty().withMessage('El password es obligatorio'),
        body('password').isLength({min: 6}).withMessage('El password debe tener al menos 6 caracteres')
    ],
    validacionesUsuarios,
    register);

router.post('/login',
    [
        body('email').notEmpty().withMessage('El email es obligatorio'),
        body('email').trim().isEmail().withMessage('El email no es válido'),
    ],
    validacionesUsuarios, 
    login);


export default router;