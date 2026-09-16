import express from 'express';
import { obtenerPedidos, ingresarPedido, actualizarPedido, eliminarPedido } from '../controllers/pedidos.js';
import verificarToken from '../middlewares/autenticacion.js';

const router = express.Router();

router.get('/', obtenerPedidos);
router.post('/', ingresarPedido);
router.put('/:id', actualizarPedido);
router.delete('/:id', verificarToken, eliminarPedido);

export default router;