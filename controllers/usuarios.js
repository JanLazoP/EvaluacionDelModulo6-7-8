import Usuario from "../models/usuario.js";

export const obtenerUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'email']
        });

        res.json(usuarios);
    }catch(error){
        console.error('Error al obtener usuarios:', error.message);

        res.status(500).json({
            error: 'Error al obtener los usuarios'
        });
    }
}

export const ingresarUsuarios = async (req,res) => {
    try{
        const {nombre, email} = req.body;

        const usuario = await Usuario.create({
            nombre: nombre,
            email: email
        });

        res.status(201).json({
            mensaje: "Usuario creado con exito",
            usuario
        });

    }catch(error){
        console.error('Error al ingresar usuario:', error.message);

        res.status(500).json({
            error: 'Error al ingresar usuario'
        });
    }
}

export const actualizarUsuario = async (req,res) => {
    try{
        const {id} = req.params;
        const { nombre, email } = req.body;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        usuario.nombre = nombre;
        usuario.email = email;

        await usuario.save();

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario
        });
    
    }catch(error){
        console.error('Error al actualizar usuario:', error.message);

        res.status(500).json({
            error: 'Error al actualizar el usuario'
        });
    }
};

export const eliminarUsuario = async (req, res) => {
    try{
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        await usuario.destroy();

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    }catch(error){
        console.error('Error al eliminar el usuario', error.message);

        res.status(500).json({
            error: 'Error al eliminar el usuario'
        });
    }
}