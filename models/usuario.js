import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    }   
}, {
    tableName: 'usuarios',
    timestamps: false
});

export default Usuario;