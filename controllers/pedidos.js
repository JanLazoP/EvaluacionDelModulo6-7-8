import Pedido from "../models/pedidos.js";

export const obtenerPedidos = async (req, res) => {
    try{
        const pedidos = await Pedido.findAll({
            attributes: ['id', 'descripcion', 'monto', 'usuario_id']
        });

        res.json(pedidos);
    }catch(error){
        console.error('Error al obtener pedidos:', error.message);

        res.status(500).json({
            error: 'Erorr al obtener los pedidos'
        });
    }
};

export const ingresarPedido = async (req,res) => {

    try{

        const { descripcion, monto, usuario_id } = req.body;

        if (!descripcion?.trim() || !monto || !usuario_id) {
            return res.status(400).json({
                error: 'La descripción, el monto y el usuario son obligatorios'
            });
        }

        const pedido = await Pedido.create({
            descripcion: descripcion,
            monto: monto,
            usuario_id: usuario_id
        });

        res.status(201).json({
            mensaje: 'Pedido creado con éxito',
            pedido
        });

    }catch(error){

        console.error('Erorr al ingresar pedido:', error.message);
        res.status(500).json({
            error: 'Error al ingresar pedido'
        });
    }
};

export const actualizarPedido = async (req, res) => {
    try{

        const { id } = req.params;
        const { descripcion, monto } = req.body;

        if (!descripcion?.trim() || !monto) {
            return res.status(400).json({
                error: 'La descripción y el monto son obligatorios'
            });
        }

        const pedido = await Pedido.findByPk(id);

        if(!pedido){
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        pedido.descripcion = descripcion;
        pedido.monto = monto;

        await pedido.save();

        res.json({
            mensaje: 'Pedido actualizado correctamente',
            pedido
        });

    }catch(error){
        console.error('Error al actualizar pedido:', error.message);

        res.status(500).json({
            error: 'Error al ingresar pedido'
        });
    };
}

export const eliminarPedido = async (req,res) => {
    try{

        const { id } = req.params;

        const pedido = await Pedido.findByPk(id);

        if(!pedido){
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        await pedido.destroy();

        res.json({
            mensaje: 'Pedido eliminado correctamente'
        });

    }catch(error){
        console.error('Error al eliminar pedido:', error.message);
        res.status(500).json({
            error: 'Error al eliminar pedido'
        })
    }
}
