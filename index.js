import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { error } from 'console';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));

app.get('/status', (req,res) => {
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

    fs.appendFile('log.txt', registro, (error) => {
        if(error){
            console.error('Error al registrar la visita:', error);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
})



