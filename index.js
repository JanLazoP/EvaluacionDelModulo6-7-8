import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));

app.get('/status', (req,res) => {
    res.json({
        status: 'ok',
        mensaje: 'Servidor funcionando correctamente'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
})



