import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import pool from './models/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));
app.use('/', router);


try{
    await pool.query('SELECT NOW()');
    console.log('Conexion a PostgreSQL exitosa');

    app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
}catch(error){
    console.error('Error al conectar con PostgreSQL:', error.message);
}




