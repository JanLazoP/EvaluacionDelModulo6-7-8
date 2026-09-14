import express from 'express';
import fs from 'fs';
import pool from '../models/database.js';

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