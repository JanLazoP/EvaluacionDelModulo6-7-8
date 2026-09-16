import express from 'express';

import { obtenerUsuarios, ingresarUsuarios, actualizarUsuario, eliminarUsuario } from '../controllers/usuarios.js';
import verificarToken from '../middlewares/autenticacion.js';

const router = express.Router();

router.get('/', obtenerUsuarios);

router.post('/', ingresarUsuarios);

router.put('/:id', actualizarUsuario);

router.delete('/:id', verificarToken, eliminarUsuario);

export default router;
