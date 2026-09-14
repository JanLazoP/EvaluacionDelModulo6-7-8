import Usuario from './usuario.js';
import Pedido from './pedidos.js';

Usuario.hasMany(Pedido, {
    foreignKey: 'usuario_id'
});

Pedido.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
});

export { Usuario, Pedido};