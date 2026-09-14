import express from 'express';
import fs from 'fs';

const router = express.Router();

//ruta de estado
router.get('/status', (req,res) => {
    registrarVisita('/status');

    res.json({
        status: 'ok',
        mensaje: 'Servidor funcionando correctamente'
    });
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