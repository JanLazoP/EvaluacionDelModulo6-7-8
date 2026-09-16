export const subirArchivo = (req, res) => {
    if(!req.file) {
        return res.status(400).json({
            error: 'No se ha enviado ningún archivo'
        });
    }

    res.status(201).json({
        mensaje: 'Archivo subido correctamente',
        archivo: req.file.filename
    });
};