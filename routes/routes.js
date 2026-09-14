import express from 'express';
import fs from 'fs';
import pool from '../models/database.js';
import { Usuario, Pedido } from '../models/relations.js';

const router = express.Router();

//ruta de estado
router.get('/status', (req,res) => {
    registrarVisita('/status');

    res.json({
        status: 'ok',
        mensaje: 'Servidor funcionando correctamente'
    });
});

//get usuarios
router.get('/usuarios', async (req,res) => {

    try{
        const resultado = await pool.query(
            'SELECT id, nombre, email FROM usuarios'
        );

        res.json(resultado.rows);

    }catch(error){
        console.error('Error al consultar usuarios:', error.message);

        res.status(500).json({
            error: 'Error al obtener los usuarios'
        });
    }

});

//Actualizar un usuario

router.put('/usuarios/:id', async (req,res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    try{
        const usuario = await pool.query(
            'SELECT id FROM usuarios WHERE id = $1', [id]
        );

        if (usuario.rows.length === 0){
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        const resultado = await pool.query(
            `UPDATE usuarios
            SET nombre = $1, email = $2
            WHERE id = $3
            RETURNING id, nombre, email`,
            [nombre, email, id]
        );

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: resultado.rows[0]
        });

    } catch(error){
        console.error('Erorr al actualizar usuario:', error.message);

        res.status(500).json({
            error: 'Error al actualizar el usuario'
        });
    }
});

//eliminar un usuario

router.delete('/usuarios/:id', async (req,res) =>{
    const { id } = req.params;

    try{
        const usuario = await pool.query(
            'SELECT id FROM usuarios WHERE id = $1', [id]
        );

        if(usuario.rows.length === 0){
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
        
        await pool.query(
            'DELETE FROM usuarios WHERE id = $1', [id]
        );

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    }catch(error){
        console.error('Error al eliminar usuario:', error.message);

        res.status(500).json({
            error: 'Error al eliminar el usuario'
        });
    }
});

//agregar un usuario

router.post('/usuarios', async (req, res) => {
    const { nombre, email } = req.body;

    if(!nombre || !email){
        return res.status(400).json({
            error: 'El nombre y el email son obligatorios'
        });
    }

    try{
        const usuario = await pool.query(

            `INSERT INTO usuarios (nombre, email)
             VALUES ($1, $2)
             RETURNING id, nombre, email`,
            [nombre, email]);
        
        res.status(201).json({
            mensaje: 'Usuario agregado con éxito',
            usuario: usuario.rows[0]
        })

    }catch(error){
        console.error('Error al agregar usuario', error.message);

        res.status(500).json({
            error: 'Error al agregar un usuario'
        })
    }
})

//agregar un usuario con producto

router.post('/usuarios/con-pedido', async (req, res) => {
    const { nombre, email, descripcion, monto } = req.body;

    const client = await pool.connect();

    try{
        await client.query('BEGIN');

        const usuario = await client.query(
            `INSERT INTO usuarios (nombre, email)
            VALUES ($1, $2)
            RETURNING id, nombre, email`, 
            [nombre, email]
        );

        const usuarioId = usuario.rows[0].id;

        const pedido = await client.query(
            `INSERT INTO pedidos (descripcion, monto, usuario_id)
            VALUES ($1, $2, $3)
            RETURNING descripcion, monto, usuario_id`,
            [descripcion, monto, usuarioId]
        );

        await client.query('COMMIT');

        res.status(201).json({
            mensaje: 'Transacción realizada correctamente',
            usuario: usuario.rows[0],
            pedido: pedido.rows[0]
        });
    }catch(error){
        await client.query('ROLLBACK');

        console.error('Transaccion cancelada:', error.message);

        res.status(500).json({
            error: 'La transacción fue cancelada y los cambios fueron revertidos'
        });
    } finally {
        client.release();
    }
});

//ruta que devuelve usuarios usando ORM
router.get('/usuarios-orm', async (req, res) => {
    try{
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'email']
        });

        res.json(usuarios);
    }catch(error){
        console.error('Error al obtener usuarios mediante ORM:', error.message);

        res.status(500).json({
            error: 'Error al obtener los usuarios'
        });
    }
});

//consulta de usuarios con pedidos
router.get('/usuarios-con-pedidos', async (req, res) => {
    try{
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'email'],
            include: [
                {
                    model: Pedido,
                    attributes: ['id', 'descripcion', 'monto']
                }
            ]
        });

        res.json(usuarios);
    }catch(error){
        console.error('Error al obtener usuarios con pedidos:', error.message);

        res.status(500).json({
            error: 'Error al obtener usuarios con sus pedidos'
        });
    }
});


function registrarVisita(ruta){
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-CL');
    const horaFormateada = fecha.toLocaleTimeString('es-CL');

    const registro = `${fechaFormateada} - ${horaFormateada} - Ruta: ${ruta} \n`;

    fs.appendFile('logs/log.txt', registro, (error) => {
        if(error){
            console.error('Error al registrar la visita:', error);
        }
    });
}

export default router;