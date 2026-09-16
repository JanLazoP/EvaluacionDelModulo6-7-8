import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import pool from './models/database.js';
import sequelize from './models/sequelize.js';
import './models/relations.js';
import usuarioRoutes from './routes/usuarios.js';
import pedidoRouter from './routes/pedidos.js';
import uploadRoutes from './routes/upload.js';
import loginRoutes from './routes/login.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));
app.use('/', router);
app.use('/usuarios', usuarioRoutes);
app.use('/pedidos', pedidoRouter);
app.use('/upload', uploadRoutes);
app.use('/login', loginRoutes);


try{
    await pool.query('SELECT NOW()');
    console.log('Conexion a PostgreSQL exitosa');

    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL mediante Sequelize exitosa');

    app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
}catch(error){
    console.error('Error al conectar con PostgreSQL:', error.message);
}




