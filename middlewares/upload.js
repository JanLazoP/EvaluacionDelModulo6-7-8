import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const tiposPermitidos = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (tiposPermitidos.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;