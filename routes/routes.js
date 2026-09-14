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