import express from 'express';
import { obtenerPedidos, ingresarPedido, actualizarPedido, eliminarPedido } from '../controllers/pedidos.js';

const router = express.Router();

router.get('/', obtenerPedidos);
router.post('/', ingresarPedido);
router.put('/:id', actualizarPedido);
router.delete('/:id', eliminarPedido);

export default router;