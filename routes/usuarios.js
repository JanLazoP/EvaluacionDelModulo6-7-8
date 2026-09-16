import express from 'express';

import { obtenerUsuarios, ingresarUsuarios, actualizarUsuario, eliminarUsuario } from '../controllers/usuarios.js';

const router = express.Router();

router.get('/', obtenerUsuarios);

router.post('/', ingresarUsuarios);

router.put('/:id', actualizarUsuario);

router.delete('/:id', eliminarUsuario);

export default router;
