import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    monto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'pedidos',
    timestamps: false
});

export default Pedido;