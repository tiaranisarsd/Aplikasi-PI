import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Dokumentasi = db.define('dokumentasi', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kegiatanName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    imageKegiatan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
}, {
    freezeTableName: true
});


export default Dokumentasi;
